import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './css/Dashboard.css'
import logo from '../assets/images/logo.png';

export default function Dashboard() {
  return (

    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" style={{ width: '5rem' , height: "5rem"}} />
          <span className="logo-label" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>ThunderBank</span>
        </div>
          <Link to='Accounts'> Accounts  </Link>
          <Link to='CreateUser'> Create User </Link>
          <Link to='Transactions'> Transactions </Link>
          <Link to='SendMoney'> Send Money </Link>
      </div>
      <main className="main">
        <div className="main-components">
        <Outlet />
        </div>
      </main>
    </div>
  )


}
