import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useToast,
} from '@chakra-ui/react';

const SendMoney = () => {
  const toast = useToast();
  const [sendFrom, setSendFrom] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    // Validate input
    if (!sendFrom || !sendTo || !amount) {
      toast({
        title: 'All fields are required.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Retrieve balances from localStorage
    const senderBalance = localStorage.getItem(sendFrom);
    const receiverBalance = localStorage.getItem(sendTo);

    if (!senderBalance || parseFloat(senderBalance) < parseFloat(amount)) {
      toast({
        title: 'Insufficient balance.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Update balances in localStorage
    localStorage.setItem(sendFrom, (parseFloat(senderBalance) - parseFloat(amount)).toString());
    localStorage.setItem(sendTo, (parseFloat(receiverBalance || 0) + parseFloat(amount)).toString());

    // Success message
    toast({
      title: 'Money sent successfully!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    // Reset fields
    setSendFrom('');
    setSendTo('');
    setAmount('');
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <FormControl id="sendFrom">
          <FormLabel>Send From</FormLabel>
          <Input
            placeholder="search..."
            value={sendFrom}
            onChange={(e) => setSendFrom(e.target.value)}
          />
        </FormControl>
        <FormControl id="sendTo">
          <FormLabel>Send To</FormLabel>
          <Input
            placeholder="search..."
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
          />
        </FormControl>
        <FormControl id="amount">
          <FormLabel>Amount</FormLabel>
          <Input
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Send
        </Button>
      </VStack>
    </Box>
  );
};

export default SendMoney;

