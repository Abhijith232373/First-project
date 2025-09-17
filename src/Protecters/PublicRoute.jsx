import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/LoginContext"; 
const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
