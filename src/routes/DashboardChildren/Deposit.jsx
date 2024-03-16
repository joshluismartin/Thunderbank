import { useState, useEffect } from "react"
import '../css/Deposit.css'
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, ModalOverlay } from '@chakra-ui/react'
import { TableContainer, Table, TableCaption, Thead, Th, Tbody, Tr, Td } from '@chakra-ui/react'

export default function Deposit() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [transactions, setTransactions] = useState([])

  const deposit = () => {
    setError('')
    setNotice('')
    if (Number(amount) > 0) {
      setBalance(prev => Number(prev) + Number(amount))
      setNotice(`Successfully deposited ${formattedAmount(amount)}`)
      setTransactions([...transactions,{
        amount: amount,
        status: 'deposit',
        balance: balance + Number(amount),
        timedate: new Date().toISOString(),
      }])
    } else {
      setError('Invalid deposit amount')
      console.log('Invalid deposit amount')
    }
  }

  const withdraw = () => {
    setError('')
    setNotice('')

    if (Number(amount) > 0 && Number(amount) <= balance){
      setBalance(prev => Number(prev) - Number(amount));
      setNotice(`Successfully withdrawn ${formattedAmount(amount)}`)
      setTransactions([...transactions,{
        amount: amount,
        status: 'withdraw',
        balance: balance - Number(amount),
        timedate: 'March 16,2024'
      }])
    } else {
      setError('Invalid withdrawal amount')
      console.log('Invalid withdrawal amount');
    }
  }

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
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(1px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Transactions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="balance-container">
              <p className="balanceAmount">Josh Luis Martin</p>
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
                    <Th>Time & Date</Th>
                    <Th>Status</Th>
                    <Th>Amount</Th>
                    <Th isNumeric>Balance</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions.map((transaction, index) => (
                    <Tr>
                    <Td>{transaction.timedate}</Td>
                    <Td>{transaction.status}</Td>
                    <Td>{transaction.amount}</Td>
                    <Td>{transaction.balance}</Td>
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
