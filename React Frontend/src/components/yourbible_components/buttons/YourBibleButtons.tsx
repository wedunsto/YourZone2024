/**
 * Menu buttons for the YourBible view:
 *  Create: Creates a new Bible study entry
 */

import { useEffect, useState } from "react";
import NewYourBibleEntryModal from "../modals/NewYourBibleEntryModal";
import HomeButton from "../../HomeButton";

const YourBibleButtons = () => {
    // State variables for the YourBibleEntries
    const [title, setTitle] = useState('');
    const [newModalVisible, setNewModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // State variables for the YourBibleLessons
    const [bibleVerse, setBibleVerse] = useState('');
    const [bibleVerseNote, setBibleVerseNote] = useState('');
    
    // Empty out existing error message when title or Bible verse change
    useEffect(() => {
        setErrorMessage("");
    }, [title, bibleVerse]);

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