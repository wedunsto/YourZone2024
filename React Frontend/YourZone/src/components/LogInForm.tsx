// Log in component used to access the home page for those authorized
import { useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate, useLocation } from 'react-router-dom';
import CredentialInputField from './CredentialInputField';

const LOGIN_URL = '/authenticate';

const LogInForm = () => {
    const { setAuth } = useAuth() as any;
    // Used to navigate to the home page after authentication
    const navigate = useNavigate();
    const location = useLocation();

    // Get the location of where you wanted to access after log in
    // Or set the destination to the root path
    const from = location.state?.from?.pathname || "/";

    // Hooks used for username, password, and error values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Empty out existing error message when username or password change
    useEffect(() => {
        setErrorMessage("");
    }, [username, password]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({username, password}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;
            const roles =response?.data?.roles;
            setAuth({username, password, roles, accessToken});

            // Reset inputs upon logging in
            setUsername("");
            setPassword("");
            setErrorMessage("");
            navigate("/home");
        } catch(err) {
            if(!(err as any)?.response) {
                setErrorMessage('No Server Response');
            } else if ((err as any).response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if ((err as any).response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
        }
    };

    return(
        <div>
            {errorMessage? <p>{errorMessage}</p> : null}
            <form onSubmit={handleSubmit}>
                <CredentialInputField 
                    title='Username'
                    property='text'
                    valid={null}
                    value={username}
                    setCredential={setUsername}
                />
                <CredentialInputField 
                    title='Password'
                    property='password'
                    value={password}
                    valid={null}
                    setCredential={setPassword}
                />
                <button
                    disabled={!username || !password? true : false}
                    className='my-5 btn btn-outline'>Log In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <a href="/register">Sign Up</a>
                </span>
            </p>
        </div>
    );
};

export default LogInForm;