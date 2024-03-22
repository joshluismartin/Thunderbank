import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Input,
  Button,
  Select,
  extendTheme,
} from '@chakra-ui/react';
import { User } from './User.js'; // Assume User class is exported from User.js

// Custom theme to extend Chakra UI
const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
});

function BudgetApp() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users") || "[]"));
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  // Effect to update the selected user based on selectedUserId
  useEffect(() => {
    const user = users.find(u => u.userId === selectedUserId);
    setSelectedUser(user || null);
  }, [selectedUserId, users]);

  const handleAddExpense = () => {
    if (selectedUser) {
      selectedUser.addExpenseItem(name, parseInt(cost, 10));
      // Optionally update the users array and localStorage here if necessary
      setName('');
      setCost('');
      // Trigger a re-render if users are updated outside of React state
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Select onChange={(e) => setSelectedUserId(e.target.value)}>
        {users.map(user => (
          <option key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</option>
        ))}
      </Select>

      <Box p={5}>
        <VStack spacing={4}>
          <Text>Current Balance: {selectedUser ? selectedUser.accountBalance : 'Select a user'}</Text>
          <Input placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
          <Button onClick={handleAddExpense}>Add Expense</Button>
          {selectedUser && selectedUser.listExpenseItems().map((item) => (
            <Box key={item.id}>
              <Text>{item.name}: Php{item.cost}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default BudgetApp;
