import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Pages/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default ProtectedRoute;
