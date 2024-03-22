import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './css/Dashboard.css'
import logo from '../assets/images/logo.png';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  RadioGroup,
  useDisclosure,
  Radio,
  Stack,

} from '@chakra-ui/react'

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('left')

  return (
    <>
      <RadioGroup defaultValue={placement} onChange={setPlacement}>
        <Stack direction='row' mb='4'>
        </Stack>
      </RadioGroup>
      <Button color='#ECC94B' colorScheme="white" onClick={onOpen} style={{ width: '100px', height: '50px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' }}>
        <img src={logo} alt="Logo" style={{ width: '3rem', height: '3rem' }} />
      </Button>
      <div className="logo-container">
        <img src={logo} alt="Logo" style={{ width: '40rem', height: "40rem" }} />
        <span className="logo-label" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>ThunderBank</span>
      </div>


      <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size='sm' colorScheme="red">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <div className="dashboard-container">
              <div className="sidebar">
                <div className="logo">
                  <img src={logo} alt="Logo" style={{ width: '4rem', height: "4rem" }} />
                  <span className="logo-label" style={{ fontWeight: 'bold', fontSize: '2rem' }}>ThunderBank</span>
                </div>
                <Link to='Accounts'> Accounts  </Link>
                <Link to='CreateUser'> Create User </Link>
                <Link to='Transactions'> Transactions </Link>
                <Link to='SendMoney'> Send Money </Link>
              </div>
            </div>

          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <main className="main">
        <Outlet />
      </main>
    </>
  )
}
