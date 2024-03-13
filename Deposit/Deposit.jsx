import { useState, useEffect } from "react"
import './styles.css'

export function Deposit() {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState(0)

  const deposit = () => {
    if (Number(amount) > 0) {
      setBalance(prev => Number(prev) + Number(amount))
    } else {
      console.log('Invalid deposit amount')
    }
  }

  const withdraw = () => {
    if (Number(amount) > 0 && Number(amount) <= balance){
      setBalance(prev => Number(prev) - Number(amount));
    } else {
    console.log('Invalid withdrawal amount');
    }
  }

  const formattedBalance = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(balance);

  return (
    <div className="balance-container">
      <p className="balanceAmount">Balance</p>
      <div>{formattedBalance}</div>
      <input type="number" onChange={(e) => setAmount(e.target.value)}></input>
      <button onClick={deposit}>Deposit</button>
      <button onClick={withdraw}>Withdraw</button>
    </div>
  );
}
