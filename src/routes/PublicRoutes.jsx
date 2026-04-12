import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { useEffect } from "react";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // ✅ prevent crash
  if (!user) return children;

  if (user?.data?.user?.role === "patient") {
    return <Navigate to="/patient-dashboard" />;
  }
  else if (user?.data?.user?.role === "doctor") {
    return <Navigate to="/doctor-dashboard" />;
  }

  return children;
};

export default PublicRoute;