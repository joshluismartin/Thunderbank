import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Input,
  Button,
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
  const [user, setUser] = useState(new User('user@example.com', 'password123', 'Jane Doe', 1000));
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const handleAddExpense = () => {
    user.addExpenseItem(name, parseInt(cost, 10));
    setName('');
    setCost('');
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={5}>
        <VStack spacing={4}>
          <Text>Current Balance: {user.accountBalance}</Text>
          <Input placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
          <Button onClick={handleAddExpense}>Add Expense</Button>
          {user.listExpenseItems().map((item) => (
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

