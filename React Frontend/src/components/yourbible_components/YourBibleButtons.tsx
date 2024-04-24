/**
 * Menu buttons for the YourBible view:
 *  Create: Creates a new Bible study entry
 */

import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import YourBibleModal from "./YourBibleModal";
import HomeButton from "../HomeButton";

const BIBLE_URL = '/createBibleStudyNote';

// Explicit types for properties in this component
interface accessTokenProp {
    accessToken: string,
    id: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface YourBibleButtonsProp {
    submittedBool: boolean,
    setSubmittedFtn: (value: boolean) => void;
}

interface ErrorProp {
    response: string
}

const YourBibleButtons = ({submittedBool, setSubmittedFtn}: YourBibleButtonsProp) => {
    const [title, setTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { auth } = useAuth() as AuthProp;

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);

        if(errorMessage !== '') setErrorMessage('');
    }

    const onClickCreate = () => {
        setModalVisible(true);
    }

    const clearFields = () => {
        setTitle('');
        setErrorMessage('');
    }

    const onClickClose = () => {
        clearFields();
        setModalVisible(false);
    }

    const createBibleStudy = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(!(title === '')) {
            try {
                const response = await axios.post(BIBLE_URL,
                    JSON.stringify({ "userId": auth.id, title }),
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    }
                );
                console.log(response);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        } else {
            setErrorMessage('Ensure all fields are filled out.');
        }
        clearFields();
        setSubmittedFtn(!(submittedBool)); // Reloads the screen
        setModalVisible(false);
    }

    return (
        <div className="flex mr-10">
            <div className="flex-1">
                {errorMessage !== '' ? <p>{errorMessage}</p> : null}
                <div className="flex flex-col space-y-3">
                    <label 
                        className="btn"
                        onClick={onClickCreate}
                        htmlFor="createBibleStudy">Add Bible Study Notes</label>
                    <HomeButton />
                </div>
                <input
                    type="checkbox"
                    id="createBibleStudy" 
                    className="modal-toggle"
                    readOnly
                    checked={modalVisible} />

                    <YourBibleModal
                        title={title}
                        updateTitle={updateTitle}
                        submit={createBibleStudy}
                        modalVisible={modalVisible}
                        onClickClose={onClickClose}
                        errorMessage={errorMessage} />
            </div>
        </div>
    );
}

export default YourBibleButtons;