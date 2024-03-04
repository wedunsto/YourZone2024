// Entry of a unauthorized user, and a button to approve them

import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

interface accessTokenProp {
    accessToken: string,
    id: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface ResponseProp {
    status: number
}

interface ErrorProp {
    response: ResponseProp
}

interface UnapprovedUserProp {
    username: string,
    _id: string
}

interface UnapprovedUsersProp {
    unapprovedUsers: Array<UnapprovedUserProp>,
    submitted: boolean,
    setSubmitted: (e: boolean) => void
}

const USER_APPROVAL_URL = '/updateUserRoles';
const USER_DENIAL_URL = '/deleteUser';

const UnapprovedUser = ({ unapprovedUsers, submitted, setSubmitted }: UnapprovedUsersProp) => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { auth } = useAuth() as AuthProp;

    // Approve a user to User status
    const handleApproval = async (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
        e.preventDefault();

        try {
            const response = await axios.put(USER_APPROVAL_URL,
                JSON.stringify({"id": userId}),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                });
            setSubmitted(!submitted);
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
    }
    
    // Deny a user, deleting the user
    const handleDenial = async (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
        e.preventDefault();
        const BIBLE_URL = `/getBibleStudyNotes?userId=${auth.id}`;
        try {
            const response = await axios.delete(`${USER_DENIAL_URL}?userId=${userId}`,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                });
            setSubmitted(!submitted);
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
    }

    return(
        <div className="overflow-x-auto">
            {errorMessage? <p>{errorMessage}</p> : null}
            <button onClick={() => navigate("/home")}>Home</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Approve</th>
                        <th>Deny</th>
                    </tr>
                </thead>
                <tbody>
                    {unapprovedUsers.map((user) =>
                        <tr key={uuidv4()}>
                            <th>{user.username}</th>
                            <td>
                                <button onClick={(e) => handleApproval(e, user._id)}>Approve</button>
                            </td>
                            <td>
                                <button onClick={(e) => handleDenial(e, user._id)}>Deny</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UnapprovedUser;