// Modal used to create and edit YourBible lessons
// YourBible lessons are a collection of Bible verses and notes that are in an array on the YourBible entry
import { useContext, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { AuthProp } from "../../../props/CommonProps";
import { BibleLesson_Context, BibleLessonContextProp } from "../../../views/YourBibleLessonView";

interface NewYourBibleLessonModalProp {
    mode: "create" | "edit";
    modalVisible: boolean;
    toggleModalVisible: () => void;
    id?: string;
    index?: number;
    bibleVerse?: string;
    bibleVerseNotes?: string;
}

const YourBibleLessonModal = ( { mode, modalVisible, toggleModalVisible,
    index, bibleVerse, bibleVerseNotes }: NewYourBibleLessonModalProp ) => {
    const { auth } = useAuth() as AuthProp;
    const { toggleSubmitted } = useContext<BibleLessonContextProp>(BibleLesson_Context);
    const { bibleStudyId } = useContext<BibleLessonContextProp>(BibleLesson_Context);
    const CREATE_BIBLE_LESSON_URL = `yourBible/createBibleLesson?bibleStudyId=${bibleStudyId}`;
    const UPDATE_BIBLE_LESSON_URL = `yourBible/updateBibleLesson?bibleStudyId=${bibleStudyId}`;

    const [ newBibleVerse, setNewBibleVerse ] = useState<string>(bibleVerse || "");
    const [ newBibleVerseNote, setNewBibleVerseNote ] = useState<string>(bibleVerseNotes || "");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateBibleVerse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBibleVerse(e.target.value);
    }

    const updateBibleVerseNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewBibleVerseNote(e.target.value);
    }

    const clear = () => {
        setNewBibleVerse("");
        setNewBibleVerseNote("");
    }

    const closeOrSubmit = () => {
        clear();
        toggleModalVisible();
    }

    const updateBibleLesson = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(newBibleVerse === "" || newBibleVerseNote === "") {
            setErrorMessage("Ensure all fields are filled out.");
            return;
        }

        try {
            if(mode === "create") {
                await axios.put(CREATE_BIBLE_LESSON_URL,
                    JSON.stringify({ bibleVerse: newBibleVerse, bibleVerseNote: newBibleVerseNote}),
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    }
                );
            } else {
                await axios.put(UPDATE_BIBLE_LESSON_URL,
                    JSON.stringify({ bibleVerse: newBibleVerse, bibleVerseNote: newBibleVerseNote, index }),
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    }
                );
            }
        } catch(err) {
            setErrorMessage(`${err}`);
        }
        closeOrSubmit();
        toggleSubmitted(); // Reloads the screen
    }

    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <label htmlFor="bibleVerse"
                        className="text-xl mb-2">Bible Verse</label>
                    <input
                        type="text"
                        id="bibleVerse"
                        value={newBibleVerse}
                        onChange={updateBibleVerse}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        placeholder="Enter Bible Verse" />
                    <label htmlFor="bibleVerseNotes"
                        className="text-xl mb-2">Bible Verse Notes</label>
                    <textarea
                        id="bibleVerseNotes"
                        value={newBibleVerseNote}
                        onChange={updateBibleVerseNotes}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        placeholder="Enter Bible Verse Notes" />
                </form>
                <div className="flex justify-between">
                    <button
                        className="btn btn-primary"
                        onClick={updateBibleLesson}>Submit</button>
                    <button
                        className="btn btn-secondary"
                        onClick={closeOrSubmit}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default YourBibleLessonModal;