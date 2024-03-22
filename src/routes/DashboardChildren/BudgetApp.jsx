
import React, { useState, useEffect } from "react";
import { Input, Button, VStack, HStack, Text, useToast } from "@chakra-ui/react";

const BudgetApp = () => {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const userId = "someUserId"; // Replace with actual user ID logic
  const toast = useToast();
  const [stanuSers, setStanusers] = useState(JSON.parse(localStorage.getItem("users") || "[]"))
  const [userId, setuserId] = useState('')

  useEffect(() => {
    // Load user and transactions data from local storage
    const userData = JSON.parse(localStorage.getItem("users"))?.find(user => user.userId === userId);
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const userTransactions = transactions.filter(transaction => transaction.userId === userId);

    if (userData) {
      setBalance(userData.balance);
      setExpenses(userTransactions);
    }
  }, [userId]);

  const handleAddExpense = () => {
    const newExpense = {
      expenseName,
      amount: -Math.abs(expenseCost),
      status: 'Expense',
      balance: balance - expenseCost,
      userId: userId,
      timedate: new Date().toLocaleString('en-US'),
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);

    // Update transactions in local storage
    localStorage.setItem('transactions', JSON.stringify(updatedExpenses));
    setBalance(prevBalance => prevBalance - expenseCost);
    toast({
      title: "Expense Added",
      description: "Your expense has been successfully recorded",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4}>
      <Text>Current Balance: {balance}</Text>
      <Input placeholder="Expense Name" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
      <Input placeholder="Expense Cost" type="number" value={expenseCost} onChange={(e) => setExpenseCost(e.target.value)} />
      <Button onClick={handleAddExpense}>Add Expense</Button>
      <VStack>
        {expenses.map((expense, index) => (
          <HStack key={index}>
            <Text>{expense.expenseName}: ${expense.amount}</Text>
            {/* Add any additional management functionality here */}
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default BudgetApp;
