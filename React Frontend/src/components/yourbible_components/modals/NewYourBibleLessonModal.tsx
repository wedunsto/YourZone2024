import { useContext, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AuthProp } from "../../../props/CommonProps";
import { ContextProp, YourBible_Context } from "../../../views/YourBibleView";

// Modal used to create a new YourBible lesson
interface NewYourBibleLessonModalProp {
    modalVisible: boolean;
    toggleModalVisible: () => void;
}

const NewYourBibleLessonModal = ( { modalVisible, toggleModalVisible }: NewYourBibleLessonModalProp ) => {
    const CREATE_BIBLE_LESSON_URL = '/updateBibleLessonNotes';
    const { auth } = useAuth() as AuthProp;
    const { toggleSubmitted } = useContext<ContextProp>(YourBible_Context);

    const [ bibleVerse, setBibleVerse ] = useState<string>("");
    const [ bibleVerseNotes, setBibleVerseNotes ] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    }

    const clearNewTitle = () => {
        setNewTitle("");
    }
}

export default NewYourBibleLessonModal;