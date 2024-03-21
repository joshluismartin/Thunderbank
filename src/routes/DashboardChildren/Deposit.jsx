import { useState, useEffect } from "react"
import '../css/Deposit.css'
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, ModalOverlay } from '@chakra-ui/react'
import { TableContainer, Table, TableCaption, Thead, Th, Tbody, Tr, Td } from '@chakra-ui/react'

export default function Deposit({ user, resetUsers }) {
  const [balance, setBalance] = useState(user['balance']);
  const [amount, setAmount] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [transactions, setTransactions] = useState([
    {
      amount: user['balance'],
      status: 'Deposit',
      balance: user['balance'],
      timedate: new Date().toLocaleString('en-US'),
    }
  ])

  const deposit = () => {
    setError('')
    setNotice('')
    if (Number(amount) > 0) {
      setBalance(prev => Number(prev) + Number(amount))
      setNotice(`Successfully deposited ${formattedAmount(amount)}`)
      const newBalance = Number(balance) + Number(amount)
      const newTransaction = {
        accountName: `${user['firstName']} ${user['lastName']}`,
        amount: amount,
        status: 'deposit',
        balance: newBalance,
        timedate: new Date().toLocaleString('en-US'),
      }
      setTransactions([...transactions, newTransaction])
      setStorageBalance(newBalance)
    } else {
      setError('Invalid deposit amount')
      console.log('Invalid deposit amount')
    }
  }

  const withdraw = () => {
    setError('')
    setNotice('')

    if (Number(amount) > 0 && Number(amount) <= balance) {
      setBalance(prev => Number(prev) - Number(amount));
      setNotice(`Successfully withdrawn ${formattedAmount(amount)}`)
      const newBalance = Number(balance) - Number(amount)
      const newTransaction = {
        accountName: `${user['firstName']} ${user['lastName']}`,
        amount: amount,
        status: 'Withdraw',
        balance: newBalance,
        timedate: new Date().toLocaleString('en-US')
      }
      setTransactions([...transactions, newTransaction])
      setStorageBalance(newBalance)
    } else {
      setError('Invalid withdrawal amount')
      console.log('Invalid withdrawal amount');
    }
  }

  const setStorageBalance = (newBalance) => {
    const otherUsers = usersStorage().filter(x => {
      return x['userId'] !== user['userId'];
    })
    console.log('otherusers', otherUsers)
    const newUser = { ...user, 'balance': newBalance }
    const newUsers = [...otherUsers, newUser]
    localStorage.setItem('users', JSON.stringify(newUsers))
    resetUsers()
  }

  const usersStorage = () => {
    return JSON.parse(localStorage.getItem('users'))
  }

  // const findUserIndex = (id) => {
  //   const users = usersStorage()
  //   const index = users.findIndex(p => p['User ID'] == user['User ID'])
  //   return index
  // }

  const formattedAmount = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formattedBalance = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(balance);

  const onClickModal = () => {
    onOpen()
  }

  return (
    <>
      <Button
        onClick={onClickModal}
      >
        Transactions
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(1px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Transactions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="balance-container">
              <p className="currentUser">{`${user['firstName']} ${user['lastName']}`}</p>
              <div>{formattedBalance}</div>
              <div className="error">{error}</div>
              <div className="notice">{notice}</div>
              <input className="number-input" type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Please enter amount"></input>
              <button onClick={deposit} className="transaction-button">Deposit</button>
              <button onClick={withdraw} className="transaction-button">Withdraw</button>
            </div>
            <TableContainer>
              <Table size='sm' variant='striped' colorScheme='teal'>
                <Thead>
                  <Tr>
                    <Th>Date & Time</Th>
                    <Th>Status</Th>
                    <Th>Amount</Th>
                    <Th isNumeric>Balance</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions.map((transaction, index) => (
                    <Tr key={index}>
                      <Td>{transaction.timedate}</Td>
                      <Td>{transaction.status}</Td>
                      <Td>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(transaction.amount)}</Td>
                      <Td>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(transaction.balance)}</Td>
                    </Tr>
                  ))}

                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>

      </Modal>

    </>

  );
}
