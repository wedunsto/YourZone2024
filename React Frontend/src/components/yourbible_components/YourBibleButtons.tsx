/**
 * Menu buttons for the YourBible view:
 *  Create: Creates a new Bible study entry
 */

import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import YourBibleModal from "./YourBibleModal";
import LogoutButton from "../LogoutButton";
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
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [bibleVerses, setBibleVerses] = useState('');
    const [bibleNotes, setBibleNotes] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { auth } = useAuth() as AuthProp;

    const updateType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);

        if(errorMessage !== '') setErrorMessage('');
    }

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);

        if(errorMessage !== '') setErrorMessage('');
    }

    const updateBibleVerses = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBibleVerses(e.target.value);

        if(errorMessage !== '') setErrorMessage('');
    }

    const updateBibleNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedValue = e.target.value.replace(/\r\n/g, '\n');
        setBibleNotes(updatedValue);

        if(errorMessage !== '') setErrorMessage('');
    }

    const onClickCreate = () => {
        setModalVisible(true);
    }

    const clearFields = () => {
        setTitle('');
        setBibleVerses('');
        setBibleNotes('');
        setErrorMessage('');
    }

    const onClickClose = () => {
        clearFields();
        setModalVisible(false);
    }

    const createBibleStudy = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(!(type === '' || title === '' || bibleVerses === '' || bibleNotes === '')) {
            try {
                await axios.post(BIBLE_URL,
                    JSON.stringify({"userId": auth.id, type, title, "bibleverses": bibleVerses.split(","), "notes": bibleNotes}),
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                    clearFields();
                    setSubmittedFtn(!(submittedBool)); // Reloads the screen
                    setModalVisible(false);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        } else {
            setErrorMessage('Ensure all fields are filled out.');
        }
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
                    <LogoutButton setErrorMessage={setErrorMessage} />
                </div>
                <input
                    type="checkbox"
                    id="createBibleStudy" 
                    className="modal-toggle"
                    readOnly
                    checked={modalVisible} />

                    <YourBibleModal
                        type={type}
                        title={title}
                        bibleVerses={bibleVerses}
                        bibleNotes={bibleNotes}
                        updateType={updateType}
                        updateTitle={updateTitle}
                        updateBibleVerses={updateBibleVerses}
                        updateBibleNotes={updateBibleNotes}
                        submit={createBibleStudy}
                        modalVisible={modalVisible}
                        onClickClose={onClickClose}
                        errorMessage={errorMessage} />
            </div>
        </div>
    );
}

export default YourBibleButtons;