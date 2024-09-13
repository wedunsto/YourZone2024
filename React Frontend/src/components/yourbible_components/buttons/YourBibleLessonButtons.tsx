/**
 * Menu buttons for the YourBible view:
 *  Create: Creates a new Bible study entry
 */

import { useEffect, useState } from "react";
import NewYourBibleLessonModal from "../modals/NewYourBibleLessonModal";
import HomeButton from "../../HomeButton";

interface BibleNoteProp {
    bibleVerse: string,
    bibleVerseNote: string
}

interface YourBibleButtonsProp {
}

const YourBibleLessonButtons = () => {
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

    return (
        <div className="flex mr-10">
            <div className="flex-1">
                {errorMessage !== '' ? <p>{errorMessage}</p> : null}
                <div className="flex flex-col space-y-3">
                    <label 
                        className="btn"
                        onClick={onClickCreate}
                        htmlFor="createBibleStudy">Add Bible Lesson Notes</label>
                    <HomeButton />
                </div>
                <input
                    type="checkbox"
                    id="createBibleStudy" 
                    className="modal-toggle"
                    readOnly
                    checked={newModalVisible} />
                <NewYourBibleLessonModal
                    modalVisible={newModalVisible}
                    toggleModalVisible={toggleModalVisible}
                />
            </div>
        </div>
    );
}

export default YourBibleLessonButtons;