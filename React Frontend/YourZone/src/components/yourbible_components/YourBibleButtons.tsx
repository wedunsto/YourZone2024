// Menu buttons for the YourBible view

import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const BIBLE_URL = '/createBibleStudy';

interface YourBibleButtonsProp {
    submittedBool: boolean
    setSubmittedFtn: Function
}

const YourBibleButtons = ({submittedBool, setSubmittedFtn}: YourBibleButtonsProp) => {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [bibleVerses, setBibleVerses] = useState('');
    const [bibleNotes, setBibleNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { auth } = useAuth() as any;

    const onTypeChange = (e: any) => {
        setType(e.target.value);
    }

    const updateTitle = (e: any) => {
        setTitle(e.target.value);
    }
    const updateBibleVerses = (e: any) => {
        setBibleVerses(e.target.value);
    }

    const updateBibleNotes = (e: any) => {
        const updatedValue = e.target.value.replace(/\r\n/g, '\n');
        setBibleNotes(updatedValue);
    }

    const clearFields = () => {
        setTitle('');
        setBibleVerses('');
        setBibleNotes('');
    }

    const createBibleStudy = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(BIBLE_URL,
                JSON.stringify({"userId": auth.id, type, title, "bibleverses": bibleVerses.split(","), "notes": bibleNotes}),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                });
                setTitle('');
                setBibleVerses('');
                setBibleVerses('');
                setBibleNotes('');
                setSubmittedFtn(!(submittedBool));
        } catch(err) {
            setErrorMessage((err as any).response);
        }
    }

    return (
        <div className="flex mr-10">
            <div className="flex-1">
                {errorMessage? <p>{errorMessage}</p> : null}
                <label 
                    htmlFor="createBibleStudy"
                    className="btn">Add Bible Study Notes</label>
                <input
                    type="checkbox"
                    id="createBibleStudy" 
                    className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <form 
                            className="flex flex-col rounded-lg">
                            <div className="flex flex-row">
                                <div className="flex flex-row m-4">
                                    <span className="label-text mr-2">Bible Notes</span>
                                    <input 
                                        type="radio"
                                        value={"BibleNotes"}
                                        checked={type === "BibleNotes"}
                                        className="radio" onChange={onTypeChange} />
                                </div>
                                <div className="flex flex-row m-4">
                                    <span className="label-text mr-2">Sermon Notes</span>
                                    <input 
                                        type="radio"
                                        value={"SermonNotes"}
                                        checked={type === "SermonNotes"}
                                        className="radio" onChange={onTypeChange} />
                                </div>
                                <div className="flex flex-row m-4">
                                    <span className="label-text mr-2">Service Notes</span>
                                    <input 
                                        type="radio"
                                        value="ServiceNotes"
                                        checked={type === "ServiceNotes"}
                                        className="radio" onChange={onTypeChange} />
                                </div>
                            </div>
                            <input 
                                id="title"
                                type="text"
                                value={title}
                                className="border-2 border-white rounded-lg mb-2 p-2"
                                onChange={updateTitle} 
                                placeholder="Enter Title" />
                            <input 
                                id="bibleverses"
                                type="text"
                                value={bibleVerses}
                                className="border-2 border-white rounded-lg my-2 p-2"
                                onChange={updateBibleVerses}
                                placeholder="Enter Bible verses" />
                            <textarea
                                id="notes"
                                value={bibleNotes}
                                className="border-2 border-white rounded-lg my-2 p-2"
                                onChange={updateBibleNotes}
                                placeholder="Enter Bible Notes" />
                        </form>
                        <div className="flex justify-between">
                            <label 
                                htmlFor="createBibleStudy"
                                className="btn mt-2"
                                onClick={clearFields}>Close</label>
                            
                            <label
                                htmlFor="createBibleStudy"
                                className="btn mt-2"
                                onClick={createBibleStudy}>Submit</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourBibleButtons;