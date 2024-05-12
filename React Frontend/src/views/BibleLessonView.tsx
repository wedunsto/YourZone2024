import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import YourBibleButtons from "../components/yourbible_components/YourBibleButtons";

interface accessTokenProp {
    id: string;
    accessToken: string
}

interface BibleNoteProp {
    bibleVerse: string,
    bibleVerseNote: string
}

interface BibleNotesProp {
    _id: string,
    bibleVerseNotes: Array<BibleNoteProp>
    date: string,
    title: string,
    userId: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface ErrorProp {
    response: string
}

const BibleLessonView = () => {
    let { bibleStudyId } = useParams();
    const BIBLE_LESSON_URL = `/getBibleLessonNotes?bibleStudyId=${bibleStudyId}`;
    const { auth } = useAuth() as AuthProp;

    const [bibleNotes, setBibleNotes] = useState(Array<BibleNoteProp>);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const getBibleStudyNotes = async () => {
            try {
                const response = await axios.get(BIBLE_LESSON_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                console.log(response?.data[0]?.bibleVerseNotes);
                setBibleNotes(response?.data[0]?.bibleVerseNotes);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        }

        getBibleStudyNotes();
    },[submitted]);

    return (
        <div>
            {errorMessage? <p>{errorMessage}</p> : null}
            <div className="flex flex-row ml-5 mt-5">
                <YourBibleButtons 
                    buttonTitle="Add Bible Verse Notes"
                    bibleStudyId={bibleStudyId}
                    bibleNotes = {bibleNotes}
                    submittedBool={submitted}
                    setSubmittedFtn={setSubmitted} />

                {bibleNotes.map((bibleNote) =>
                    <>
                        <p>{bibleNote.bibleVerse}</p>
                        <p>{bibleNote.bibleVerseNote}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default BibleLessonView;