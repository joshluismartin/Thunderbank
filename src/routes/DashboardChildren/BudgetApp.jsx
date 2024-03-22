
import React, { useState, useEffect } from "react";
import { Input, Button, VStack, HStack, Text, useToast, Select } from "@chakra-ui/react";

const BudgetApp = () => {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users") || "[]"));
  const [userId, setUserId] = useState(users[0]?.userId || ""); // Initialize with the first user's ID if available
  const toast = useToast();

  useEffect(() => {
    // Reload user and transactions data from local storage when userId changes
    const userData = users.find(user => user.userId === userId);
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const userTransactions = transactions.filter(transaction => transaction.userId === userId);

    if (userData) {
      setBalance(userData.balance);
      setExpenses(userTransactions);
    }
  }, [userId, users]); // Add users to the dependency array

  const handleAddExpense = () => {
    const newExpense = {
      expenseName,
      amount: -Math.abs(Number(expenseCost)),
      status: 'Expense',
      balance: balance - Number(expenseCost),
      userId: userId,
      timedate: new Date().toLocaleString('en-US'),
    };

    // Update transactions in local storage
    const updatedTransactions = [...expenses, newExpense];
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    setExpenses(updatedTransactions);

    // Update balance in local state and local storage
    const newBalance = balance - Number(expenseCost);
    setBalance(newBalance);

    // Update the user's balance in the users array and then update local storage
    const updatedUsers = users.map(user => {
      if (user.userId === userId) {
        return { ...user, balance: newBalance };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

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
      <label>Send From (User Name): </label>
      <Select value={userId} onChange={e => setUserId(e.target.value)}>
        {users.map(user => (
          <option key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</option>
        ))}
      </Select>

      <Text>Current Balance: Php {balance}</Text>
      <Input placeholder="Expense Name" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
      <Input placeholder="Expense Cost" type="number" value={expenseCost} onChange={(e) => setExpenseCost(e.target.value)} />
      <Button onClick={handleAddExpense}>Add Expense</Button>
      <VStack>
        {expenses.map((expense, index) => (
          <HStack key={index}>
            <Text>{expense.expenseName}: Php {expense.amount}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default BudgetApp;
