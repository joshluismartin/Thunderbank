import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Axios } from "axios";
import { useEffect } from "react";

export default function Forex() {
  const [info, setInfo] = useState({});
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("eur");
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

  const convert = () => {
    const rate = info[to];
    setOutput(rate);
  };

  return (
    <div className="App">
      <h1>Forex Rates</h1>
      <div>
        <label>From:</label>
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div>
        <label>To:</label>
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <button onClick={convert}>Convert</button>
      <div>
        <p>Rate: {output}</p>
      </div>
    </div>
  );
}
