import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { useEffect } from "react";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
 
  // ✅ If user is logged in → redirect
  if (user) {
    if (user.role === "patient") {
      return <Navigate to="/patient-dashboard" replace />;
    } else if (user.role === "doctor") {
      return <Navigate to="/doctor-dashboard" replace />;
    }
  }

  // ✅ Not logged in → allow access
  return children;
};

export default PublicRoute;