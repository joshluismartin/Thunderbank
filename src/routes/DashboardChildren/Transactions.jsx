import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Deposit from './Deposit'

export default function Transactions() {
  return (
    <>
      <div> Transactions </div>
      <Deposit />
    </>
  )
}
