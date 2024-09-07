// Collapsable table entries for YourBible
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditYourBibleEntryModal from "./modals/EditYourBibleEntryModal";

interface YourBibleEntryProp{
    id: string,
    title: string,
}

const YourBibleEntry = (
    { id, title }: YourBibleEntryProp) => {
        
        const DELETE_STUDY_URL = '/deleteBibleStudyNote';

        const [ newTitle, setNewTitle ] = useState<string>("");
        const [ editModalVisible, setEditModalVisible ] = useState<boolean>(false);
        const [ deleteModalVisible, setDeleteModalVisible ] = useState<boolean>(false);
        const [ deleteEntryConfirmation, setDeleteEntryConfirmation ] = useState<boolean>(false);
        const [ errorMessage, setErrorMessage ] = useState<string>("");

        const navigate = useNavigate();

        const onClickEdit = () => {
            setNewTitle(title);
            setEditModalVisible(true);
        }

        const toggleModalVisible =() => {
            setEditModalVisible(false);
        }

        const onClickDelete = () => {
            setDeleteEntryConfirmation(true);
        }

        /*const deleteBibleStudy = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            } catch(err) {
                setErrorMessage(`${err}`);
            }
            toggleSubmitted();
        }*/

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
                    <EditYourBibleEntryModal
                        bibleStudyId={id}
                        modalVisible={editModalVisible}
                        toggleModalVisible={toggleModalVisible} />
                </div>
                { deleteEntryConfirmation ? 
                    <div role="alert" className="alert">
                        <span>Are you sure you want to delete this entry?</span>
                        <div>
                            <button className="btn btn-sm" onClick={() => {setDeleteEntryConfirmation(false)}}>No</button>
                            <button className="btn btn-sm">Yes</button>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
}

export default YourBibleEntry;