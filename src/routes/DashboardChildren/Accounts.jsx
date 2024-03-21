import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import UserBudget from "./UserBudget";

export default function Accounts() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));

  const resetUsers = () => {
    setUsers(JSON.parse(localStorage.getItem("users")));
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="orange">
        <TableCaption>Existing Thunderbank User Accounts</TableCaption>
        <Thead>
          <Tr>
            <Th>Account ID</Th>
            <Th>Account Name</Th>
            <Th isNumeric>Current Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user, index) => (
            <Tr key={index}>
              <Td>{user.userId}</Td>
              <Td>
                {user.firstName}
                {"\u00A0"}
                {user.lastName}
              </Td>
              <Td>PHP {user.balance}</Td>
              <Td>
                <UserBudget user={user} resetUsers={resetUsers} />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Account ID</Th>
            <Th>Account Name</Th>
            <Th isNumeric>Current Balance</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
