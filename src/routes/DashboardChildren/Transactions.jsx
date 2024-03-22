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
      <TableContainer style={{width: "100%"}}>
        <Table size='sm' variant='striped' colorScheme='orange'>
          <Thead>
            <Tr>
              <Th>Account Name</Th>
              <Th>User ID</Th>
              <Th isNumeric>Current Balance</Th>
              <Th style={{textAlign: "center"}}>Transaction History</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, index) => (
              <Tr key={index}>
                <Td>{user['firstName']} {user['lastName']}</Td>
                <Td>{user['userId']}</Td>
                <Td isNumeric>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(user['balance'])}</Td>
                <Td style={{textAlign: "center"}}><Deposit user={user} resetUsers={resetUsers} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
