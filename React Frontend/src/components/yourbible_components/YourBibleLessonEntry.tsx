import { useContext, useState } from "react";
import YourBibleLessonModal from "./modals/YourBibleLessonModal";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { AuthProp } from "../../props/CommonProps";
import { BibleLesson_Context, BibleLessonContextProp } from "../../views/BibleLessonView";

interface YourBibleLessonEntryProp {
    id: string | undefined,
    index: number,
    bibleVerse: string,
    bibleVerseNotes: string
}

const YourBibleLessonEntry = ({ id, index,
     bibleVerse, bibleVerseNotes }: YourBibleLessonEntryProp) => {
    const DELETE_LESSON_URL = `yourBible/deleteBibleLesson?bibleStudyId=${id}`;
    const { auth } = useAuth() as AuthProp;
    const { toggleSubmitted } = useContext<BibleLessonContextProp>(BibleLesson_Context);
    
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ deleteLessonConfirmation, setDeleteLessonConfirmation ] = useState<boolean>(false);

    const clickEdit = () => {
        setModalVisible(true);
    }

    const toggleModalVisible = () => {
        setModalVisible(false);
    }

    const onClickDelete = () => {
        setDeleteLessonConfirmation(true);
    }

    const deleteBibleLesson = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await axios.put(DELETE_LESSON_URL,
                JSON.stringify({ index }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true
                }
            );
        } catch(err) {
            setErrorMessage(`${err}`);
        }
        toggleSubmitted();
    }

    return(
        <div className="flex flex-col">
            {errorMessage === '' ? null : <p>{errorMessage}</p>}
            <div className="flex flex-row mb-6">
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        {bibleVerse}
                    </div>
                    <div className="collapse-content">
                        {bibleVerseNotes}
                    </div>
                </div>
                <div className="flex flex-col ml-5">
                        <label 
                            className="mb-2 bg-slate-400 text-black btn btn-sm"
                            htmlFor="updateBibleStudy"
                            onClick={clickEdit}>Edit</label>
                            <input
                                type="checkbox"
                                id="updateBibleLesson"
                                className="modal-toggle"
                                readOnly
                                checked={modalVisible}
                            />
                            <YourBibleLessonModal
                                mode="edit"
                                id={id}
                                index={index}
                                bibleVerse={bibleVerse}
                                bibleVerseNotes={bibleVerseNotes}
                                modalVisible={modalVisible} 
                                toggleModalVisible={toggleModalVisible} />
                        <label
                            className="bg-red-600 text-black btn btn-sm"
                            htmlFor="deleteBibleStudy"
                            onClick={onClickDelete}>Delete</label>
                </div>
            </div>
            { deleteLessonConfirmation ? 
                <div role="alert" className="alert">
                    <span>Are you sure you want to delete this lesson?</span>
                    <div>
                        <button className="btn btn-sm" onClick={() => {setDeleteLessonConfirmation(false)}}>No</button>
                        <button className="btn btn-sm" onClick={deleteBibleLesson}>Yes</button>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
};

export default YourBibleLessonEntry;