import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAuthProp {
    allowedRoles: any
}

const RequireAuth = ({ allowedRoles }: RequireAuthProp) => {
    const { auth } = useAuth() as any;
    const location = useLocation();
    
    // replace: Replace the login in their navigation history with the location they came from
    // Allow you to back up to the last place you were
    // This will take you to where you wanted to go originally when you do log in
    console.log(auth);
    return (
        auth?.roles?.find((role:Number) => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.username
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;