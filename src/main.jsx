import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./routes/Login.jsx"
import Dashboard from "./routes/Dashboard.jsx"

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
        path: "/Accounts",
        element: <Accounts />,
      },
      {
        path: "/CreateUser",
        element: <CreateUser />,
      },
      {
        path: "/Transactions",
        element: <Transactions />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
