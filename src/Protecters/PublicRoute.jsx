import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    // Already logged in → go to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
