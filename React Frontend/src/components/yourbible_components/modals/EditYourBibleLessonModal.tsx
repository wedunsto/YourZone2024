import { useContext, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AuthProp } from "../../../props/CommonProps";
import axios from "../../../api/axios";
import { BibleLesson_Context, BibleLessonContextProp } from "../../../views/BibleLessonView";

interface EditYourBibleLessonModalProps {
    id: string | undefined,
    index: number,
    bibleVerse: string,
    bibleVerseNotes: string,
    modalVisible: boolean,
    toggleModalVisible: () => void
}

const EditYourBibleLessonModal = ({ id, index, modalVisible, toggleModalVisible,
    bibleVerse, bibleVerseNotes }: EditYourBibleLessonModalProps) => {
 
    const UPDATE_LESSON_URL = '/updateBibleLessonNote';
    const { auth } = useAuth() as AuthProp;
    const { toggleSubmitted } = useContext<BibleLessonContextProp>(BibleLesson_Context);
    
    const [ editBibleVerse, setEditBibleVerse ] = useState<string>(bibleVerse);
    const [ editBibleVerseNotes, setEditBibleVerseNotes ] = useState<string>(bibleVerseNotes);
    const [ errorMessage, setErrorMessage ] = useState<string>('');

    const updateBibleVerse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditBibleVerse(e.target.value);
    }

    const updateBibleVerseNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditBibleVerseNotes(e.target.value);
    }

    const cleadEditTexts = () => {
        setEditBibleVerse(bibleVerse);
        setEditBibleVerseNotes(bibleVerseNotes);
    }

    const closeOrSubmit = () => {
        cleadEditTexts();
        toggleModalVisible();
    }

    const updateBibleLessonNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        try {
            await axios.post(UPDATE_LESSON_URL,
                JSON.stringify( { bibleStudyId: id  , index, bibleVerse: editBibleVerse, bibleVerseNote: editBibleVerseNotes } ),
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    }
                );
            } catch(err) {
                setErrorMessage(`${err}`);
            }
        closeOrSubmit();
        toggleSubmitted(); // Reloads the screen
    }

    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            { errorMessage !== "" ? <p>{ errorMessage }</p> : null}
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <p className="text-xl mb-2">Edit Bible Verse</p>
                    <input
                        id="bibleVerse"
                        type="text"
                        value={editBibleVerse}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateBibleVerse}
                        placeholder="Enter BibleVerse"
                    />
                    <textarea
                        id="expandedText"
                        value={editBibleVerseNotes}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateBibleVerseNotes}
                        placeholder="Enter Bible Notes"
                    />
                </form>
                <div className="flex justify-between">
                    <button
                        className="btn mt-2"
                        onClick={closeOrSubmit}>Close</button>
                    <button
                        className="btn mt-2"
                        onClick={updateBibleLessonNote}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default EditYourBibleLessonModal;