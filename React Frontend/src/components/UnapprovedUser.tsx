// Entry of a unauthorized user, and a button to approve them

import { v4 as uuidv4 } from 'uuid';
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";
import HomeButton from "./HomeButton";

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
    setErrorMessage: (e: string) => void
}

const USER_APPROVAL_URL = '/updateUserRoles';
const USER_DENIAL_URL = '/deleteUser';

const UnapprovedUser = ({ unapprovedUsers, submitted, setSubmitted, setErrorMessage }: UnapprovedUsersProp) => {
    const { auth } = useAuth() as AuthProp;

    // Approve a user to User status
    const handleApproval = async (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
        e.preventDefault();

        try {
            // @ts-ignore
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

        try {
            // @ts-ignore
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
            <div className='m-3 flex space-x-3'>
                <HomeButton />
                <LogoutButton setErrorMessage={setErrorMessage}/>
            </div>
            <table className="m-5 table">
                <thead>
                    <tr>
                        <th className="text-white text-lg">Username</th>
                        <th className="text-white text-lg">Approve</th>
                        <th className="text-white text-lg">Deny</th>
                    </tr>
                </thead>
                <tbody>
                    {unapprovedUsers.map((user) =>
                        <tr key={uuidv4()}>
                            <th className="text-white text-lg">{user.username}</th>
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