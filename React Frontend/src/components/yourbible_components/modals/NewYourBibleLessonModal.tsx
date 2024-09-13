// Modal used to create a new YourBible lesson
// You can enter a Bible verse and notes for that verse

import { useContext, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { AuthProp } from "../../../props/CommonProps";
import { BibleLesson_Context, BibleLessonContextProp } from "../../../views/BibleLessonView";

interface NewYourBibleLessonModalProp {
    modalVisible: boolean;
    toggleModalVisible: () => void;
}

const NewYourBibleLessonModal = ( { modalVisible, toggleModalVisible }: NewYourBibleLessonModalProp ) => {
    const UPDATE_BIBLE_LESSON_URL = '/updateBibleLessonNotes';

    const { auth } = useAuth() as AuthProp;
    const { toggleSubmitted } = useContext<BibleLessonContextProp>(BibleLesson_Context);
    const { bibleStudyId } = useContext<BibleLessonContextProp>(BibleLesson_Context);

    const [ bibleVerse, setBibleVerse ] = useState<string>("");
    const [ bibleVerseNote, setBibleVerseNote ] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateBibleVerse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBibleVerse(e.target.value);
    }

    const updateBibleVerseNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBibleVerseNote(e.target.value);
    }
    
    const clear = () => {
        setBibleVerse("");
        setBibleVerseNote("");
    }

    const closeOrSubmit = () => {
        clear();
        toggleModalVisible();
    }

    const updateBibleLesson = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(bibleVerse != "" && bibleVerseNote != "") {
            try {
                await axios.post(UPDATE_BIBLE_LESSON_URL,
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
        closeOrSubmit();
        toggleSubmitted(); // Reloads the screen
    };

    return (
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>

            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <label
                        htmlFor="bibleVerse"
                        className="text-xl mb-2">Bible Verse</label>
                    <input
                        type="text"
                        id="bibleVerse"
                        value={bibleVerse}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateBibleVerse}
                        placeholder="Enter Bible Verse" />
                    <label
                        htmlFor="bibleVerseNotes"
                        className="text-xl mb-2">Bible Verse Notes</label>
                    <textarea
                        id="bibleVerseNotes"
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        value={bibleVerseNote}
                        onChange={updateBibleVerseNotes}
                        placeholder="Enter Bible Verse Notes" />
                </form>
                <button
                    className="btn mt-2"
                    onClick={closeOrSubmit}>Close</button>
                <button
                className="btn mt-2"
                onClick={updateBibleLesson}>Submit</button>
            </div>
        </div>
    );
}

export default NewYourBibleLessonModal;