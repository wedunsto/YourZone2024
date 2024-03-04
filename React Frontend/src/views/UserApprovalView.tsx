// List of users pending access to YourZone, and buttons to approve them

import axios from "../api/axios";
import UnapprovedUser from "../components/UnapprovedUser";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

// Explicit types for properties in this component
interface accessTokenProp {
    id: string;
    accessToken: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface UnapprovedUserProp {
    username: string,
    _id: string
}

interface ErrorProp {
    response: string
}

const USER_APPROVAL_URL = '/getUsersAwaitingApproval';

const UserApprovalView = () => {
    const [unapprovedUsers, setUnapprovedUsers] = useState(new Array<UnapprovedUserProp>);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { auth } = useAuth() as AuthProp;

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
                setUnapprovedUsers(response?.data);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        }

        getUsersAwaitingApproval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitted]);

    return(
        <div>
            {errorMessage? <p>{errorMessage}</p> : null}
            <UnapprovedUser
                unapprovedUsers={unapprovedUsers}
                submitted={submitted}
                setSubmitted={setSubmitted}
             />
        </div>
    );
}

export default UserApprovalView;