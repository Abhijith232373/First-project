import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/LoginContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/user" replace />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
