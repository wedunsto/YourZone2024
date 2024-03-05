// Log in component used to access the home page for those authorized
import { useState, useEffect, FormEvent } from 'react';
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate, useLocation } from 'react-router-dom';
import CredentialInputField from './CredentialInputField';
import Captcha from './Captcha';

const adminRole = import.meta.env.VITE_ADMIN_ROLE;

// Replace any type with details about objects
interface ResponseProp {
    status: number
}

interface ErrorProp {
    response: ResponseProp
}

interface AuthProp {
    setAuth: (e: object) => void
}

const LOGIN_URL = '/login';

const LogInForm = () => {
    const { setAuth } = useAuth() as AuthProp;
    const navigate = useNavigate();
    const location = useLocation();

    // Get the location of where you wanted to access after log in
    // Or set the destination to the home page
    const from = location.state?.from?.pathname || "/home";

    // Hooks used for username, password, and error values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Hook used to confirm captcha status
    const [isCaptchaVerified, setCaptchaVerified] = useState(false);

    // Empty out existing error message when username or password change
    useEffect(() => {
        setErrorMessage("");
    }, [username, password]);

    // Authenticate credentials for login process
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if(isCaptchaVerified) {
                const response = await axios.post(LOGIN_URL,
                    JSON.stringify({username, password}),
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                const id = response?.data?.id;
                const accessToken = response?.data?.accessToken;
                const roles =response?.data?.roles;
    
                // Store user data in context to use in other components
                setAuth({username, password, roles, accessToken, id});
    
                // Reset inputs upon logging in
                // Return to last page or go to home page
                setUsername("");
                setPassword("");
                setErrorMessage("");
                
                if(roles.indexOf(parseInt(adminRole, 10)) > -1) {
                    navigate('/userapproval')
                } else {
                    navigate(from, { replace: true });
                }
            } else {
                setErrorMessage('Please complete CAPTCHA verification.');
            }

        } catch(err) {
            if(!(err as ErrorProp)?.response) {
                setErrorMessage('No Server Response');
            } else if ((err as ErrorProp).response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if ((err as ErrorProp).response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
        }
    };

    return(
        <div className='flex justify-center'>
            <div className="flex-col">
                {errorMessage? <p className='text-white'>{errorMessage}</p> : null}
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
                    <Captcha 
                        setCaptchaVerified={setCaptchaVerified}
                    />
                    
                    <button
                        style={{ backgroundColor: !username || !password ? '#CCCCCC' : '#FFFFFF' }}
                        disabled={!username || !password? true : false}
                        className='my-5 btn btn-outline'>Log In</button>
                </form>
                <p className='text-white'>
                    Need an Account?<br />
                    <span className="line">
                        <a
                            className='text-white underline'
                            href="/register">Sign Up
                        </a>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LogInForm;