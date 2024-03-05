// Function called by logout buttons to log a user out

import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

interface LogoutButtonProp {
    setErrorMessage: (e: string) => void
}
interface accessTokenProp {
    accessToken: string,
    id: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface ErrorProp {
    response: string
}

const LogoutButton = ({ setErrorMessage }: LogoutButtonProp) => {
    const navigate = useNavigate();
    const { auth } = useAuth() as AuthProp;

    const LOGOUT_URL= `/logout?userId=${auth.id}`;

    const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        try {
            const response = await axios.get(LOGOUT_URL,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                }
            );
            navigate("/");
        } catch(err) {
            setErrorMessage((err as ErrorProp).response);
        }
    }

    return (
        <button className="text-lg" onClick={(e) => logout(e)}>Logout</button>
    );
}

export default LogoutButton;