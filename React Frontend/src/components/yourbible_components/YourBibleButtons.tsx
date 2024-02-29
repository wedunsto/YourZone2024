// Menu buttons for the YourBible view

import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import YourBibleModal from "./YourBibleModal";

const BIBLE_URL = '/createBibleStudyNote';

interface YourBibleButtonsProp {
    submittedBool: boolean,
    setSubmittedFtn: (value: boolean) => void;
}

const YourBibleButtons = ({submittedBool, setSubmittedFtn}: YourBibleButtonsProp) => {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [bibleVerses, setBibleVerses] = useState('');
    const [bibleNotes, setBibleNotes] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { auth } = useAuth() as any;

    const updateType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
    }

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const updateBibleVerses = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBibleVerses(e.target.value);
    }

    const updateBibleNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedValue = e.target.value.replace(/\r\n/g, '\n');
        setBibleNotes(updatedValue);
    }

    const onClickCreate = () => {
        setModalVisible(true);
    }

    const clearFields = () => {
        setTitle('');
        setBibleVerses('');
        setBibleNotes('');
    }

    const onClickClose = () => {
        clearFields();
        setModalVisible(false);
    }

    const createBibleStudy = async (e: React.FormEvent<HTMLInputElement>) => {
        console.log({"userId": auth.id, type, title, "bibleverses": bibleVerses.split(","), "notes": bibleNotes});

        e.preventDefault();

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await axios.post(BIBLE_URL,
                JSON.stringify({"userId": auth.id, type, title, "bibleverses": bibleVerses.split(","), "notes": bibleNotes}),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                });
                clearFields();
                setSubmittedFtn(!(submittedBool)); // Reloads the screen
                setModalVisible(false);
        } catch(err) {
            setErrorMessage((err as any).response);
        }
    }

    return (
        <div className="flex mr-10">
            <div className="flex-1">
                {errorMessage? <p>{errorMessage}</p> : null}
                <label 
                    className="btn"
                    onClick={onClickCreate}
                    htmlFor="createBibleStudy">Add Bible Study Notes</label>
                <input
                    type="checkbox"
                    id="createBibleStudy" 
                    className="modal-toggle"
                    checked={modalVisible} />

                    <YourBibleModal
                        type={type}
                        title={title}
                        bibleVerses={bibleVerses}
                        bibleNotes={bibleNotes}
                        updateType={updateType}
                        updateTitle={updateTitle}
                        updateBibleVerses={updateBibleVerses}
                        updateBibleNotes={updateBibleNotes}
                        submit={createBibleStudy}
                        modalVisible={modalVisible}
                        onClickClose={onClickClose} />
            </div>
        </div>
    );
}

export default YourBibleButtons;