// List of users pending access to YourZone, and buttons to approve them

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// Explicit types for properties in this component
interface accessTokenProp {
    id: string;
    accessToken: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface ErrorProp {
    response: string
}

const UserApprovalView = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { auth } = useAuth() as AuthProp;

    const USER_APPROVAL_URL = '/getUsersAwaitingApproval';

    // On page load, get all users who are awaiting approval
    useEffect(() => {
        const getUsersAwaitingApproval = async () => {
            try {
                const response = await axios.get(USER_APPROVAL_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                
                console.log(response.data);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        }

        getUsersAwaitingApproval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitted]);

    return(
        <div>
            <p>Test</p>
        </div>
    );
}

export default UserApprovalView;