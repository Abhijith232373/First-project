// PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/LoginContext"; // adjust path if needed

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // if already logged in → redirect based on role
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
