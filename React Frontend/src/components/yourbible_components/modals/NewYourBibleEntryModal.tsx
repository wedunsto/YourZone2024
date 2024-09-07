import { useState, useContext } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { AuthProp } from "../../../props/CommonProps";
import { ContextProp, YourBible_Context } from "../../../views/YourBibleView";

// Modal used to create a new YourBible entry
interface NewYourBibleEntryModalProp {
    modalVisible: boolean;
    toggleModalVisible: () => void;
}

const NewYourBibleEntryModal = ( { modalVisible, toggleModalVisible }: NewYourBibleEntryModalProp ) => {
    const CREATE_BIBLE_URL = '/createBibleStudyNote';
    const { auth } = useAuth() as AuthProp;
    const { toggleSubmitted } = useContext<ContextProp>(YourBible_Context);

    const [ newTitle, setNewTitle ] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    }

    const clearNewTitle = () => {
        setNewTitle("");
    }


    const closeOrSubmit = () => {
        clearNewTitle();
        toggleModalVisible();
    }

    const createBibleStudy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!(newTitle === '')) {
            try {
                await axios.post(CREATE_BIBLE_URL,
                    JSON.stringify({ "userId": auth.id, "title": newTitle }),
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
        } else {
            setErrorMessage('Ensure all fields are filled out.');
        }
        closeOrSubmit();
        toggleSubmitted(); // Reloads the screen
    }

    return (
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <p className="text-xl mb-2">Enter Bible Lesson Title</p>
                    <input
                        id="title"
                        type="text"
                        value={newTitle}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateNewTitle}
                        placeholder="Enter Title"
                    />
                </form>
                <div className="flex justify-between">
                    <button
                        className="btn mt-2"
                        onClick={closeOrSubmit}>Close</button>
                    <button
                        className="btn mt-2"
                        onClick={createBibleStudy}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default NewYourBibleEntryModal;