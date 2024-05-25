import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import YourBibleButtons from "../components/yourbible_components/YourBibleButtons";
import YourBibleLessonEntry from "../components/yourbible_components/YourBibleLessonEntry";
import { BibleNoteProp } from "../props/BibleLessonProps";
import { AuthProp, ErrorProp } from "../props/YourBibleProps";


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

            <div className="flex flex-col">
                {bibleNotes.map((bibleNote) =>
                    <YourBibleLessonEntry 
                        collapseText={bibleNote.bibleVerse} 
                        expandedText={bibleNote.bibleVerseNote}             
                    />
                )}
            </div>
                
            </div>
        </div>
    );
};

export default BibleLessonView;