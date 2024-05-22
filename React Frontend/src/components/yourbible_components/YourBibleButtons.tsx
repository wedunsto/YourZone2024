/**
 * Menu buttons for the YourBible view:
 *  Create: Creates a new Bible study entry
 */

import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import YourBibleModal from "./YourBibleModal";
import HomeButton from "../HomeButton";

const BIBLE_STUDY_URL = '/createBibleStudyNote';

const BIBLE_LESSON_URL = '/updateBibleLessonNotes';

// Explicit types for properties in this component
interface accessTokenProp {
    accessToken: string,
    id: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface BibleNoteProp {
    bibleVerse: string,
    bibleVerseNote: string
}

interface YourBibleButtonsProp {
    buttonTitle: string,
    bibleStudyId: string | undefined,
    bibleNotes: Array<BibleNoteProp>
    submittedBool: boolean,
    setSubmittedFtn: (value: boolean) => void;
}

interface ErrorProp {
    response: string
}

const YourBibleButtons = ({buttonTitle, bibleStudyId, bibleNotes, submittedBool, setSubmittedFtn}: YourBibleButtonsProp) => {
    const [title, setTitle] = useState('');
    const [bibleVerse, setBibleVerse] = useState('');
    const [bibleVerseNote, setBibleVerseNote] = useState('');
    const [bibleVerseNotes, setBibleVerseNotes] = useState(bibleNotes);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { auth } = useAuth() as AuthProp;

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);

        if(errorMessage !== '') setErrorMessage('');
    }

    const updateBibleVerse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBibleVerse(e.target.value);

        if(errorMessage !== '') setErrorMessage('');
    }

    const onClickCreate = () => {
        setModalVisible(true);
    }

    const clearFields = () => {
        setTitle('');
        setBibleVerse('');
        setBibleVerseNote('');
        setBibleVerseNotes(bibleNotes);
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
                await axios.post(BIBLE_STUDY_URL,
                    JSON.stringify({ "userId": auth.id, title }),
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    }
                );
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

    const updateBibleLesson = async () => {
        try {
            await axios.post(BIBLE_LESSON_URL,
                JSON.stringify({bibleStudyId, bibleVerse, bibleVerseNote}),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                }
            )
        } catch(err) {
            
        }

        clearFields();
        setSubmittedFtn(!(submittedBool)); // Reloads the screen
        setModalVisible(false);
    };

    return (
        <div className="flex mr-10">
            <div className="flex-1">
                {errorMessage !== '' ? <p>{errorMessage}</p> : null}
                <div className="flex flex-col space-y-3">
                    <label 
                        className="btn"
                        onClick={onClickCreate}
                        htmlFor="createBibleStudy">{buttonTitle}</label>
                    <HomeButton />
                </div>
                <input
                    type="checkbox"
                    id="createBibleStudy" 
                    className="modal-toggle"
                    readOnly
                    checked={modalVisible} />

                    <YourBibleModal
                    buttonTitle={buttonTitle}
                    title={title}
                    updateTitle={updateTitle}
                    bibleVerse={bibleVerse}
                    bibleVerseNote={bibleVerseNote}
                    bibleVerseNotes={bibleVerseNotes}
                    updateBibleVerse={updateBibleVerse}
                    updateBibleNotes={setBibleVerseNotes}
                    createNewBibleStudy={createBibleStudy}
                    bibleStudyId={bibleStudyId}
                    modalVisible={modalVisible}
                    onClickClose={onClickClose}
                    errorMessage={errorMessage}
                    createNewBibleLesson={updateBibleLesson} />
            </div>
        </div>
    );
}

export default YourBibleButtons;