// Collapsable table entries for YourBible
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

interface YourBibleEntryProp{
    id: string,
    type: string,
    collapseText: string,
    bibleVerses: string[],
    expandText: string,
    submitted: boolean,
    setSubmitted: Function
}

const YourBibleEntry = (
    {id, type, collapseText, bibleVerses, expandText, submitted, setSubmitted}: YourBibleEntryProp) => {
        const UPDATE_BIBLE_URL = '/updateBibleStudy';
        const DELETE_STUDY_URL = '/deleteBibleStudy';

        const [newType, setNewType] = useState('');
        const [newTitle, setNewTitle] = useState('');
        const [newBibleVerses, setNewBibleVerses] = useState('');
        const [newBibleNotes, setNewBibleNotes] = useState('');
        const [modalVisible, setModalVisible] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const { auth } = useAuth() as any;

        const lineSeperatedNotes = expandText.split(/\n/g);

        const onClickEdit = () => {
            setNewType(type);
            setNewTitle(collapseText);
            setNewBibleVerses(bibleVerses.join(", "));
            setNewBibleNotes(expandText);
            setModalVisible(true);
        }
    
        const onClose = () => {
            setModalVisible(false);
        }

        const onTypeChange = (e: any) => {
            setNewType(e.target.value);
        }

        const updateTitle = (e: any) => {
            setNewTitle(e.target.value);
        }

        const updateBibleVerses = (e: any) => {
            setNewBibleVerses(e.target.value);
        }

        const updateBibleNotes = (e: any) => {
            const updatedValue = e.target.value.replace(/\r\n/g, '\n');
            setNewBibleNotes(updatedValue);
        }

        const updateBibleStudy = async (e: any) => {
            e.preventDefault();

            try {
                const response = await axios.post(UPDATE_BIBLE_URL,
                    JSON.stringify({ 
                        id,
                        "type": newType,
                        "title": newTitle,
                        "bibleverses": newBibleVerses.split(","),
                        "notes": newBibleNotes }),
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                    setSubmitted(!(submitted));
            } catch(err) {
                setErrorMessage((err as any).response);
            }
        }

        const deleteBibleStudy = async (e:any) => {
            e.preventDefault();
            
            try {
                const response = await axios.delete(DELETE_STUDY_URL, {
                    data: JSON.stringify({ id }),
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                  });
                    setSubmitted(!(submitted));
            } catch(err) {
                setErrorMessage((err as any).response);
            }
        }

        return (
            <div className="flex flex-row mb-6">
                <div className="collapse collapse-arrow bg-base-200">
                <input type="checkbox" /> 
                <div className="collapse-title text-xl font-medium">
                    {collapseText}
                </div>
                <div className="collapse-content">
                    {bibleVerses.map((bibleVerse: string, index: number) => (
                            bibleVerses.length == 1 || index == bibleVerses.length - 1? (
                                <span>{bibleVerse}</span>
                            ) : <span>{bibleVerse}, </span>
                        )
                    )}
                    <div className="divider"></div>
                    <ul className="list-disc">
                        {lineSeperatedNotes.map((note: string) => <li key={id}>{note}</li>)}
                    </ul> 
                </div>
            </div>
            <div className="flex flex-col ml-5">
                <label 
                    className="mb-2 bg-slate-400 text-black btn btn-sm"
                    onClick={onClickEdit}
                    htmlFor="updateBibleStudy">Edit</label>

                <label 
                    className="bg-red-600 text-black btn btn-sm"
                    onClick={deleteBibleStudy}>Delete</label>
            </div>
            <input 
                type="checkbox"
                id="updateBibleStudy"
                className="modal-toggle"
                checked={modalVisible} />
            <div className={`modal ${modalVisible ? 'visible' : ''}`}>
                <div className="modal-box">
                    <form 
                        className="flex flex-col rounded-lg">
                        <div className="flex flex-row">
                            <div className="flex flex-row m-4">
                                <span className="label-text mr-2">Bible Notes</span>
                                <input 
                                    type="radio"
                                    value={"BibleNotes"}
                                    checked={newType === "BibleNotes"}
                                    className="radio" onChange={onTypeChange} />
                            </div>
                            <div className="flex flex-row m-4">
                                <span className="label-text mr-2">Sermon Notes</span>
                                <input 
                                    type="radio"
                                    value={"SermonNotes"}
                                    checked={newType === "SermonNotes"}
                                    className="radio" onChange={onTypeChange} />
                            </div>
                            <div className="flex flex-row m-4">
                                <span className="label-text mr-2">Service Notes</span>
                                <input 
                                    type="radio"
                                    value={"ServiceNotes"}
                                    checked={newType === "ServiceNotes"}
                                    className="radio" onChange={onTypeChange} />
                            </div>
                        </div>
                        <input 
                            id="title"
                            type="text"
                            value={newTitle}
                            className="border-2 border-white rounded-lg mb-2 p-2"
                            onChange={updateTitle} />
                        <input 
                            id="bibleverses"
                            type="text"
                            value={newBibleVerses}
                            className="border-2 border-white rounded-lg my-2 p-2"
                            onChange={updateBibleVerses} />
                        <textarea
                            id="notes"
                            value={newBibleNotes}
                            className="border-2 border-white rounded-lg my-2 p-2"
                            onChange={updateBibleNotes} />
                    </form>
                    <div className="flex justify-between">
                        <label 
                            htmlFor="updateBibleStudy"
                            className="btn mt-2"
                            onClick={onClose}>Close</label>
                                
                        <label
                            htmlFor="updateBibleStudy"
                            className="btn mt-2"
                            onClick={updateBibleStudy}>Submit</label>
                    </div>
                </div>
            </div>
        </div>
        );
}

export default YourBibleEntry;