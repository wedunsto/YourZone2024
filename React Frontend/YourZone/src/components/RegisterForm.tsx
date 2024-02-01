import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CredentialInputField from './CredentialInputField';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterForm = () => {
    // Store username and error reference between re-renders
    const userRef = useRef<HTMLInputElement | null>(null);
    const errorRef = useRef<HTMLInputElement | null>(null);

    // Hooks used to store username, validate username, and focus
    // on username text field
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    // Hooks used to store password, validate password, and focus
    // on password text field
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [paswordFocus, setPasswordFocus] = useState(false);

    // Hooks used to store matching password and focus on the matching
    // password text field
    const [matchingPassword, setMatchingPassword] = useState('');
    const [validMatchingPassword, setValidMatchingPassword] = useState(false);
    const [matchingPasswordFocus, setMatchingPasswordFocus] = useState(false);

    // Hook for error states
    const [errorMessage, setErrorMessage] = useState('');

    // Set the focus on the username text field when application starts
    useEffect(() => {
        if(userRef.current) {
            setErrorMessage('');
            userRef.current.focus();
        }
    }, []);

    // Validate the username when it changes
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    });

    // Validate the password when it changes
    // Compare password and matching password
    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatchingPassword(password === matchingPassword);
    }, [password, matchingPassword]);

    // Clear the error when any input changes
    useEffect(() => {
        setErrorMessage('');
    }, [username, password, matchingPassword]);

    return (
        <div className='flex flex-col'>
            <CredentialInputField 
                title='Username'
                property='text'
                value={username}
                valid={validUsername}
                ref={userRef}
                setCredential={setUsername}
                setFocus={setUsernameFocus}
            />
            <CredentialInputField 
                title='Password'
                property='password'
                value={password}
                valid={validPassword}
                ref={undefined}
                setCredential={setPassword}
                setFocus={setPasswordFocus}
            />
            <CredentialInputField 
                title='Matching Password'
                property='password'
                value={matchingPassword}
                valid={validMatchingPassword}
                ref={undefined}
                setCredential={setMatchingPassword}
                setFocus={setMatchingPasswordFocus}
            />
        </div>
    );
}

export default RegisterForm;