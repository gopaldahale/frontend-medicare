import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

function PrivateRoutes({ children, role }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login" />;

    if (role && user.role !== role) {
        return <Navigate to="/" replace />; // or unauthorized page
    }

    return children;
}

export default PrivateRoutes