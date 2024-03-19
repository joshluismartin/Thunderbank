import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SendMoney() {
  return (
    <VStack spacing={4} align="stretch">

      <Box p={5} shadow="md" borderWidth="1px">
        <FormControl id="send-from" isRequired>
          <FormLabel>Send From</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input placeholder="search..." />
          </InputGroup>
          <Text mt={2}>user. balance</Text>
        </FormControl>
      </Box>


      <Box p={5} shadow="md" borderWidth="1px">
        <FormControl id="send-to" isRequired>
          <FormLabel>Send To</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input placeholder="search..." />
          </InputGroup>
          <Text mt={2}>user. balance</Text>
        </FormControl>
      </Box>

      {/* Amount and Send Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={5} shadow="md" borderWidth="1px">
        <FormControl id="amount" isRequired w="70%">
          <Input placeholder="amount" />
        </FormControl>
        <Button colorScheme="blue" px={12}>
          Send
        </Button>
      </Box>
    </VStack>
  );
}

export default SendMoney;

