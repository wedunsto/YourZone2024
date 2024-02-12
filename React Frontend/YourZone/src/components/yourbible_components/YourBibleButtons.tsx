// Menu buttons for the YourBible view

import { SetStateAction, useState } from "react";
import axios from "../../api/axios";

const BIBLE_URL = '/createBibleStudy';

const YourBibleButtons = () => {
    const [username, setUsername] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [bibleVerses, setBibleVerses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const updateUsername = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setUsername(event.target.value);
    }

    const updateType = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setType(event.target.value);
    }

    const updateTitle = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setTitle(event.target.value);
    }
    const updateBibleVerses = () => {}

    const createBibleStudy = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(BIBLE_URL,
                JSON.stringify({username, type, title, bibleVerses}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                });
        } catch(err) {
            setErrorMessage((err as any).response);
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="createBibleStudy">Add Bible Verse</label>
                <input type="checkbox" id="createBibleStudy" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <form onSubmit={createBibleStudy} className="flex flex-col">
                            <input type="text" value={title} onChange={updateTitle} placeholder="Enter Title" />
                            <input type="text" value=/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourBibleButtons;