import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader label="Checking session..." />;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
