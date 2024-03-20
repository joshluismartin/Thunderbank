import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./routes/Login.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Accounts from "./routes/DashboardChildren/Accounts.jsx";
import CreateUser from "./routes/DashboardChildren/CreateUser.jsx";
import Transactions from "./routes/DashboardChildren/Transactions.jsx";
import SendMoney from "./routes/DashboardChildren/SendMoney.jsx";
import Deposit from "./routes/DashboardChildren/Deposit.jsx";
import Forex from "./routes/DashboardChildren/Forex.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "Accounts",
        element: <Accounts />,
      },
      {
        path: "CreateUser",
        element: <CreateUser />,
      },
      {
        path: "Transactions",
        element: <Transactions />,
      },
      {
        path: "SendMoney",
        element: <SendMoney />,
      },
      {
        path: "Deposit",
        element: <Deposit />,
      },
      {
        path: "Forex",
        element: <Forex />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
