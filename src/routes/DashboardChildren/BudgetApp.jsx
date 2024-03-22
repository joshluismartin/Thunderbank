<<<<<<< HEAD

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
=======
import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Input,
  Button,
  Select,
  extendTheme,
} from "@chakra-ui/react";
import { User } from "./User.js"; // Assume User class is exported from User.js

// Custom theme to extend Chakra UI
const theme = extendTheme({
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
});

function BudgetApp() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
>>>>>>> f3c26dee758dd2b163e1210089bc8186a686b819

  useEffect(() => {
<<<<<<< HEAD
    // Load user and transactions data from local storage
    const userData = JSON.parse(localStorage.getItem("users"))?.find(user => user.userId === userId);
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const userTransactions = transactions.filter(transaction => transaction.userId === userId);

    if (userData) {
      setBalance(userData.balance);
      setExpenses(userTransactions);
=======
    const user = users.find((u) => u.userId === selectedUserId);
    setSelectedUser(user || null);
  }, [selectedUserId, users]);

  const handleAddExpense = () => {
    if (selectedUser) {
      selectedUser.addExpenseItem(name, parseInt(cost, 10));
      // Optionally update the users array and localStorage here if necessary
      setName("");
      setCost("");
      // Trigger a re-render if users are updated outside of React state
>>>>>>> f3c26dee758dd2b163e1210089bc8186a686b819
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
<<<<<<< HEAD
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
=======
    <ChakraProvider theme={theme}>
      <Select onChange={(e) => setSelectedUserId(e.target.value)}>
        {users.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </Select>

      <Box p={5}>
        <VStack spacing={4}>
          <Text>
            Current Balance:{" "}
            {selectedUser ? selectedUser.accountBalance : "Select a user"}
          </Text>
          <Input
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Cost"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <Button onClick={handleAddExpense}>Add Expense</Button>
          {selectedUser &&
            selectedUser.listExpenseItems().map((item) => (
              <Box key={item.id}>
                <Text>
                  {item.name}: Php{item.cost}
                </Text>
              </Box>
            ))}
        </VStack>
      </Box>
    </ChakraProvider>
>>>>>>> f3c26dee758dd2b163e1210089bc8186a686b819
  );
};

export default BudgetApp;
