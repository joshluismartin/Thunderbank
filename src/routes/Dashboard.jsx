import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (

    <>
      <div>
        <Link to='Accounts'> Accounts  </Link>
        <Link to='CreateUser'> Create User </Link>
        <Link to='Transactions'> Transactions </Link>
        <Link to='SendMoney'> Send Money </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )


}
