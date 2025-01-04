// Modal used to create and edit YourBible entries
import { useContext, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { AuthProp } from "../../../props/CommonProps";
import { ContextProp, YourBible_Context } from "../../../views/YourBibleView";

interface YourBibleEntryModalProp {
    mode: "create" | "edit";
    originalTitle?: string;
    bibleStudyId?: string;
    modalVisible: boolean;
    toggleModalVisible: () => void;
}

const YourBibleEntryModal = ({ mode, originalTitle, bibleStudyId,
     modalVisible, toggleModalVisible }: YourBibleEntryModalProp) => {
    const { auth } = useAuth() as AuthProp;
    const { toggleSubmitted } = useContext<ContextProp>(YourBible_Context);
    const CREATE_BIBLE_URL = `yourBible/createBibleStudy?userId=${auth.id}`;
    const UPDATE_BIBLE_URL = `yourBible/updateBibleStudy?bibleStudyId=${bibleStudyId}`;
    
    // If mode is create, set title to empty string, otherwise set it to the original title
    const [title, setTitle] = useState<string>(originalTitle || "");
    
    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const clearTitle = () => {
        setTitle(originalTitle || "");
    }

    const closeOrSubmit = () => {
        clearTitle();
        toggleModalVisible();
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (title === "") {
            setErrorMessage("Ensure all fields are filled out.");
            return;
        }

        try {
            if (mode === "create") {
                await axios.post(CREATE_BIBLE_URL,
                    JSON.stringify({ title }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`
                        },
                        withCredentials: true
                    }
                );
            } else {
                await axios.put(UPDATE_BIBLE_URL,
                    JSON.stringify({ title }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`
                        },
                        withCredentials: true
                    }
                );
            }
        } catch (err) {
            setErrorMessage(`${err}`);
        }

        closeOrSubmit();
        toggleSubmitted(); // Reloads the screen
    }

    return (
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <p className="text-xl mb-2">{mode === "create" ? "Create" : "Edit"} Your Bible Entry Title</p>
                    <input
                        type="text" 
                        id="title" 
                        value={title} 
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateTitle}
                        placeholder="Enter Title" />
                </form>
                <div className="flex justify-between">
                    <button 
                        className="btn mt-2" 
                        onClick={closeOrSubmit}>Close</button>
                    <button
                        className="btn mt-2" 
                        onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default YourBibleEntryModal;