import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./routes/Login.jsx"
import Dashboard from "./routes/Dashboard.jsx"
import Accounts from "./routes/DashboardChildren/Accounts.jsx"
import CreateUser from "./routes/DashboardChildren/CreateUser.jsx"
import Transactions from "./routes/DashboardChildren/Transactions.jsx"
import SendMoney from "./routes/DashboardChildren/SendMoney.jsx"
import Deposit from "./routes/DashboardChildren/Deposit.jsx"
import BudgetApp from "./routes/DashboardChildren/BudgetApp.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
        path: "BudgetApp",
        element: <BudgetApp />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

