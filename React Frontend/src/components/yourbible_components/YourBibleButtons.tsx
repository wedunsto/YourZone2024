/**
 * Menu buttons for the YourBible view:
 *  Create: Creates a new Bible study entry
 */

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import YourBibleModal from "./YourBibleModal";
import NewYourBibleEntryModal from "./modals/NewYourBibleEntryModal";
import HomeButton from "../HomeButton";

const BIBLE_LESSON_URL = '/updateBibleLessonNotes';

interface BibleNoteProp {
    bibleVerse: string,
    bibleVerseNote: string
}

interface YourBibleButtonsProp {
}

const YourBibleButtons = () => {
    // State variables for the YourBibleEntries
    const [title, setTitle] = useState('');
    const [newModalVisible, setNewModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // State variables for the YourBibleLessons
    const [bibleVerse, setBibleVerse] = useState('');
    const [bibleVerseNote, setBibleVerseNote] = useState('');
    //const [bibleVerseNotes, setBibleVerseNotes] = useState(bibleNotes);
    
    // Empty out existing error message when title or Bible verse change
    useEffect(() => {
        setErrorMessage("");
    }, [title, bibleVerse]);

    const updateBibleVerse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBibleVerse(e.target.value);
    }

    const toggleModalVisible = () => {
        setNewModalVisible(false)
    }

    const onClickCreate = () => {
        setNewModalVisible(true);
    }

    const clearFields = () => {
        setTitle('');
        setBibleVerse('');
        setBibleVerseNote('');
        //setBibleVerseNotes(bibleNotes);
        setErrorMessage('');
    }

    /*const updateBibleLesson = async () => {
        if(bibleVerse != "" && bibleVerseNote != "") {
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
                setErrorMessage(`${err}`);
            }
        } else {
            setErrorMessage('Ensure all fields are filled out.');
        }

        clearFields();
        setSubmittedFtn(!(submittedBool)); // Reloads the screen
        setModalVisible(false);
    };*/

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
                    checked={newModalVisible} />
                <NewYourBibleEntryModal
                    modalVisible={newModalVisible}
                    toggleModalVisible={toggleModalVisible}
                />
            </div>
        </div>
    );
}

export default YourBibleButtons;