/* eslint-disable @typescript-eslint/no-unused-vars */
// Registration form that takes in new username and password
import { useState, useEffect, FormEvent } from 'react';
import CredentialInputField from './CredentialInputField';
import ValidationNotice from "./ValidationNotice";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Captcha from './Captcha';

// Replace any type with details about objects
interface ResponseProp {
    status: number
}

interface ErrorProp {
    response: ResponseProp
}

// Requirements for registering usernames and passwords
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const RegisterForm = () => {
    const navigate = useNavigate();

    // Hooks used to store username, validate username
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    // Hooks used to store password, validate password
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    // Hooks used to store matching password
    const [matchingPassword, setMatchingPassword] = useState('');
    const [validMatchingPassword, setValidMatchingPassword] = useState(false);

    // Hook for error states
    const [errorMessage, setErrorMessage] = useState('');

    // Hook used to confirm captcha status
    const [isCaptchaVerified, setCaptchaVerified] = useState(false);
    
    // Validate the username when it changes
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    // Validate the password when it changes
    // Compare password and matching password
    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatchingPassword(password === matchingPassword && matchingPassword !== '');
    }, [password, matchingPassword]);

    // Clear the error when any input changes
    useEffect(() => {
        setErrorMessage('');
    }, [username, password, matchingPassword]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }

        try {
            if(isCaptchaVerified) {
                // @ts-ignore
                const response = await axios.post(REGISTER_URL,
                    JSON.stringify({username: username, password}),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                
                // Clear input fields out of registration field
                setUsername("");
                setPassword("");
                setMatchingPassword("");
    
                // Navigate back to login view
                navigate("/");
            } else {
                setErrorMessage('Please complete CAPTCHA verification.');
            }

        } catch(err) {
            if(!(err as ErrorProp)?.response) {
                setErrorMessage('No Server Response');
            } else if ((err as ErrorProp).response?.status === 409){
                setErrorMessage('Username Taken');
            } else {
                setErrorMessage('Registration Failed');
            }
        }
    };

    return (
        <div className='ml-5 flex flex-col'>
            {errorMessage? <p>{errorMessage}</p> : null}
            <form onSubmit={handleSubmit}>
                <CredentialInputField 
                    title='Username'
                    property='text'
                    value={username}
                    valid={validUsername}
                    setCredential={setUsername}
                />
                <ValidationNotice
                    valid={validUsername}
                    notice={<div>3 to 24 characters. <br />
                            Must begin with a letter <br />
                            Letters, numbers, underscores, hyphens allowed.</div>}/>

                <CredentialInputField 
                    title='Password'
                    property='password'
                    value={password}
                    valid={validPassword}
                    setCredential={setPassword}
                />
                <ValidationNotice
                    valid={validPassword}
                    notice={<div>8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: 
                                <span aria-label="exclamation mark"> !, </span>
                                <span aria-label="at symbol">@, </span>
                                <span aria-label="hashtag">#, </span>
                                <span aria-label="dollar sign">$, </span>
                                <span aria-label="percent">%</span></div>}/>

                <CredentialInputField 
                    title='Matching Password'
                    property='password'
                    value={matchingPassword}
                    valid={validMatchingPassword}
                    setCredential={setMatchingPassword}
                />
                <ValidationNotice
                    valid={validMatchingPassword}
                    notice={<div>Must match the first password input field.</div>}
                />
                <Captcha
                    setCaptchaVerified={setCaptchaVerified}
                />
                <button
                    style={{ backgroundColor: !username || !password ? '#CCCCCC' : '#FFFFFF' }}
                    disabled={!validUsername || !validPassword || !validMatchingPassword? true : false}
                    className='my-5 btn btn-outline'>Sign Up</button>
            </form>
            <p className="text-white">
                Already registered?<br />
                <a 
                    className='text-white underline'
                    href="/">Sign In</a>
            </p>
        </div>
    );
}

export default RegisterForm;