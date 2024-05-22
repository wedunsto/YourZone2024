// Function called by logout buttons to log a user out
import "../styles/HomePageStyles.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

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

const LogoutButton = () => {
    const navigate = useNavigate();
    const { auth } = useAuth() as AuthProp;

    const LOGOUT_URL= `/logout?userId=${auth.id}`;

    const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        try {
            // @ts-ignore
            const response = await axios.get(LOGOUT_URL,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                }
            );
            console.log(response);
            navigate("/");
        } catch(err) {
            console.log((err as ErrorProp).response);
        }
    }

    return (
        <button className="logout-button" onClick={(e) => logout(e)}>Logout</button>
    );
}

export default LogoutButton;