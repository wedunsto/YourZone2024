// Function called by logout buttons to log a user out
import "../styles/HomePageStyles.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { AuthProp, ErrorProp } from "../props/CommonProps";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { auth } = useAuth() as AuthProp;

    const LOGOUT_URL= `/logout?userId=${auth.id}`;

    const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        try {
            await axios.get(LOGOUT_URL,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                }
            );
            navigate("/");
        } catch(err) {
            if ((err as ErrorProp).response?.status === 403) {
                navigate("/");
            } else {
                console.log((err as ErrorProp).response);
            }
        }
    }

    return (
        <button className="text-lg logout-button" onClick={(e) => logout(e)}>Logout</button>
    );
}

export default LogoutButton;