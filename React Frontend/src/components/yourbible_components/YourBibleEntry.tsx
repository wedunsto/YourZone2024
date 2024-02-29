/* eslint-disable @typescript-eslint/no-unused-vars */
// Collapsable table entries for YourBible
import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import YourBibleModal from "./YourBibleModal";
import { v4 as uuidv4 } from 'uuid';

interface YourBibleEntryProp{
    id: string,
    type: string,
    collapseText: string,
    bibleVerses: string[],
    expandText: string,
    submitted: boolean,
    setSubmitted: (submittedStatus: boolean) => void
}

interface ErrorProp {
    response: string
}

const YourBibleEntry = (
    {id, type, collapseText, bibleVerses, expandText, submitted, setSubmitted}: YourBibleEntryProp) => {
        const UPDATE_BIBLE_URL = '/updateBibleStudyNote';
        const DELETE_STUDY_URL = '/deleteBibleStudyNote';

        const [newType, setNewType] = useState('');
        const [newTitle, setNewTitle] = useState('');
        const [newBibleVerses, setNewBibleVerses] = useState('');
        const [newBibleNotes, setNewBibleNotes] = useState('');
        const [editModalVisible, setEditModalVisible] = useState(false);
        const [deleteEntryConfirmation, setDeleteEntryConfirmation] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const { auth } = useAuth() as any;

        const lineSeperatedNotes = expandText.split(/\n/g);

        const onClickEdit = () => {
            setNewType(type);
            setNewTitle(collapseText);
            setNewBibleVerses(bibleVerses.join(", "));
            setNewBibleNotes(expandText);
            setEditModalVisible(true);
        }
    
        const onClickClose = () => {
            setErrorMessage('');
            setEditModalVisible(false);
        }

        const onClickDelete = () => {
            setDeleteEntryConfirmation(true);
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
                    setEditModalVisible(false);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
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
                setErrorMessage((err as ErrorProp).response);
            }
        }

        return (
            <div className="flex flex-col">
                <div className="flex flex-row mb-6">
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            {collapseText}
                        </div>
                        <div className="collapse-content">
                            {bibleVerses.map((bibleVerse: string, index: number) => (
                                    bibleVerses.length == 1 || index == bibleVerses.length - 1? (
                                        <span key={uuidv4()}>{bibleVerse}</span>
                                    ) : <span key={uuidv4()}>{bibleVerse}, </span>
                                )
                            )}
                            <div className="divider"></div>
                            <ul className="list-disc">
                                {lineSeperatedNotes.map((note: string) => <li key={uuidv4()}>{note}</li>)}
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
                            onClick={onClickDelete}
                            htmlFor="deleteBibleStudy">Delete</label>
                    </div>

                    <input 
                        readOnly
                        type="checkbox"
                        id="updateBibleStudy"
                        className="modal-toggle"
                        checked={editModalVisible} />

                    <YourBibleModal 
                        type={newType}
                        title={newTitle}
                        bibleVerses={newBibleVerses}
                        bibleNotes={newBibleNotes}
                        updateType={onTypeChange}
                        updateTitle={updateTitle}
                        updateBibleVerses={updateBibleVerses}
                        updateBibleNotes={updateBibleNotes}
                        submit={updateBibleStudy}
                        modalVisible={editModalVisible}
                        onClickClose={onClickClose}
                        errorMessage={errorMessage} />
                </div>
                { deleteEntryConfirmation ? 
                    <div role="alert" className="alert">
                        <span>Are you sure you want to delete this entry?</span>
                        <div>
                            <button className="btn btn-sm" onClick={() => {setDeleteEntryConfirmation(false)}}>No</button>
                            <button className="btn btn-sm" onClick={deleteBibleStudy}>Yes</button>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
}

export default YourBibleEntry;