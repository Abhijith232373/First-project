import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // ❌ Not logged in → redirect to login
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default ProtectedRoute;
