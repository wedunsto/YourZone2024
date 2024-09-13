import { useContext, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AuthProp } from "../../../props/CommonProps";
import { ContextProp, YourBible_Context } from "../../../views/YourBibleView";
import axios from "../../../api/axios";

interface EditYourBibleEntryModalProp {
    bibleStudyId: string;
    originalTitle: string;
    modalVisible: boolean;
    toggleModalVisible: () => void;
}

const EditYourBibleEntryModal = ( { bibleStudyId, originalTitle,
     modalVisible, toggleModalVisible }: EditYourBibleEntryModalProp ) => {
    const UPDATE_BIBLE_URL = '/updateBibleStudyNote';

    const { auth } = useAuth() as AuthProp;
    const { toggleSubmitted } = useContext<ContextProp>(YourBible_Context);

    const [ editTitle, setEditTitle ] = useState<string>(originalTitle);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value);
    }

    const clearEditTitle = () => {
        setEditTitle(originalTitle);
    }

    const closeOrSubmit = () => {
        clearEditTitle();
        toggleModalVisible();
    }

    const updateBibleStudy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(!(editTitle === "")) {
            try {
                await axios.post(UPDATE_BIBLE_URL,
                    JSON.stringify( { id: bibleStudyId, title: editTitle } ),
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
    }
    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <p className="text-xl mb-2">Edit Bible Lesson Title</p>
                    <input
                        id="title"
                        type="text"
                        value={editTitle}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateEditTitle}
                        placeholder="Enter Title"
                    />
                </form>
                <div className="flex justify-between">
                    <button
                        className="btn mt-2"
                        onClick={closeOrSubmit}>Close</button>
                    <button
                        className="btn mt-2"
                        onClick={updateBibleStudy}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default EditYourBibleEntryModal;