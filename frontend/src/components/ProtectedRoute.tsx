import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import type { ProtectedRouteType } from "../types";
import { UserRole } from "../constants/role";

const ProtectedRoute = ({ children, role }: ProtectedRouteType) => {
    const { loading, user, token } = useAuth();

    if (!user || !token || !role) return <Navigate to="/" replace />;
    if (loading) return null;

    return children;
}

export default ProtectedRoute;
