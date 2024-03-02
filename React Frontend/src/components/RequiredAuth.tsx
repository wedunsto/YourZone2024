import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAuthProp {
    allowedRoles: Array<string>
}

interface RolesProp {
    roles: Array<number>
    username: string
}

interface AuthProp {
    auth: RolesProp
}

const RequireAuth = ({ allowedRoles }: RequireAuthProp) => {
    const { auth } = useAuth() as AuthProp;
    const location = useLocation();

    // replace: Replace the login in their navigation history with the location they came from
    // Allow you to back up to the last place you were
    // This will take you to where you wanted to go originally when you do log in
    return (
        auth?.roles?.find((role:number) => allowedRoles?.includes(role.toString()))
        ? <Outlet />
        : auth?.username
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;