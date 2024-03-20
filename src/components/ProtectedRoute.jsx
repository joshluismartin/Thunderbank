import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
	const isAuthenticated = localStorage.getItem("loggedIn"); // Adjust this condition based on your auth logic

	if (!isAuthenticated) {
		// User is not authenticated, redirect to login
		return <Navigate to="/" replace />;
	}

	return children;
};

