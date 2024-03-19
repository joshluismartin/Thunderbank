import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Deposit from './Deposit'
import { Button, ButtonGroup } from '@chakra-ui/react'
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
} from '@chakra-ui/react'

export default function Transactions() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')))

  const resetUsers = () => {
    setUsers(JSON.parse(localStorage.getItem('users')))
  }
  
  return (
    <>
      <TableContainer>
        <Table size='sm' variant='striped' colorScheme='orange'>
          <Thead>
            <Tr>
              <Th>Account Name</Th>
              <Th>User ID</Th>
              <Th isNumeric>Current Balance</Th>
              <Th>Transaction History</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={index}>
                <Td>{user['firstName']} {user['lastName']}</Td>
                <Td>{user['userId']}</Td>
                <Td isNumeric>{user['balance']}</Td>
                <Td><Deposit user={user} resetUsers={resetUsers} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
