import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Input,
  Button,
  extendTheme,
  Select,
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

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const [stanuSers, setStanusers] = useState(JSON.parse(localStorage.getItem("users") || "[]"))
  const [senderId, setSenderId] = useState('')

  let sender = users.find(user =>
    user.userId === senderId);
  console.log(sender)
  /*let recipient = users.find(user =>
    user.userId === recipientId);*/
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
      <label> User </label>
      <Select onChange={value => setSenderId(value.target.value)}>
        {stanuSers.map(user => (
          <option value={user.userId}>{user.firstName} {user.lastName}</option>))}
      </Select>

      <Box p={5}>
        <VStack spacing={4}>
         /* <Text>Current Balance: {user.balance}</Text>*/
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

