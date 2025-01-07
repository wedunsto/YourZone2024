import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';
import { AuthProp } from "../props/CommonProps";
import YourBibleLessonButtons from "../components/yourbible_components/buttons/YourBibleLessonButtons";
import YourBibleLessonEntry from "../components/yourbible_components/YourBibleLessonEntry";

interface BibleNoteProp {
    bibleVerse: string,
    bibleVerseNote: string
}

export interface BibleLessonContextProp {
    toggleSubmitted: () => void,
    bibleStudyId: string | undefined
}

export const BibleLesson_Context = createContext<BibleLessonContextProp>({ bibleStudyId: '', toggleSubmitted: () => {} });


const BibleLessonView = () => {
    const { bibleStudyId } = useParams();
    const { auth } = useAuth() as AuthProp;
    const [bibleNotes, setBibleNotes] = useState(Array<BibleNoteProp>);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const BIBLE_LESSON_URL = `yourBible/getBibleLessons?bibleStudyId=${bibleStudyId}`;

        const getBibleStudyNotes = async () => {
            try {
                const response = await axios.get(BIBLE_LESSON_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    }
                );
                setBibleNotes(response?.data);
            } catch(err) {
                setErrorMessage(`${err}`);
            }
        }

        getBibleStudyNotes();
        // Only submitted will change when a user submits a new Bible lesson
    },[auth.accessToken, bibleStudyId, submitted]);

    const toggleSubmitted = () => {
        setSubmitted(!submitted);
    }

    return (
        <div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex flex-row ml-5 mt-5">
                <BibleLesson_Context.Provider value={{ bibleStudyId, toggleSubmitted }}>
                    <YourBibleLessonButtons />
                    <div className="flex flex-col">
                        {bibleNotes.map((bibleNote) =>
                                <YourBibleLessonEntry
                                    key={uuidv4()}
                                    id={ bibleStudyId }
                                    index={bibleNotes.indexOf(bibleNote)}
                                    bibleVerse={bibleNote.bibleVerse} 
                                    bibleVerseNotes={bibleNote.bibleVerseNote}             
                                />
                            )
                        }
                    </div>
                </BibleLesson_Context.Provider>
            </div>
        </div>
    );
};

export default BibleLessonView;