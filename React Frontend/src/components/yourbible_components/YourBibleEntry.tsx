/* eslint-disable @typescript-eslint/no-unused-vars */
// Collapsable table entries for YourBible
import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import YourBibleModal from "./YourBibleModal";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

interface YourBibleEntryProp{
    id: string,
    title: string,
    submitted: boolean,
    setSubmitted: (submittedStatus: boolean) => void
}

// Explicit types for properties in this component
interface accessTokenProp {
    accessToken: string,
    id: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface ErrorProp {
    response: string
}

const YourBibleEntry = (
    {id, title, submitted, setSubmitted}: YourBibleEntryProp) => {
        const UPDATE_BIBLE_URL = '/updateBibleStudyNote';
        const DELETE_STUDY_URL = '/deleteBibleStudyNote';

        const [newTitle, setNewTitle] = useState('');
        const [editModalVisible, setEditModalVisible] = useState(false);
        const [deleteEntryConfirmation, setDeleteEntryConfirmation] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const { auth } = useAuth() as AuthProp;

        const navigate = useNavigate();

        const onClickEdit = () => {
            setNewTitle(title);
            setEditModalVisible(true);
        }
    
        const onClickClose = () => {
            setErrorMessage('');
            setEditModalVisible(false);
        }

        const onClickDelete = () => {
            setDeleteEntryConfirmation(true);
        }

        const updateTitle = (e: any) => {
            setNewTitle(e.target.value);
        }

        const updateBibleStudy = async (e: any) => {
            e.preventDefault();

            try {
                await axios.post(UPDATE_BIBLE_URL,
                    JSON.stringify({ 
                        id,
                        "title": newTitle,
                    }),
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
                await axios.delete(DELETE_STUDY_URL, {
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
                    <button onClick={() => navigate(`/yourbible/${id}`)}>{title}</button>
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
                        title={newTitle}
                        updateTitle={updateTitle}
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