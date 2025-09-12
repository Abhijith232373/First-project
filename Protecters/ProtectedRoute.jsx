import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/LoginContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
  
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default ProtectedRoute;
