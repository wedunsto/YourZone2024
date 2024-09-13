import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';
import YourBibleLessonButtons from "../components/yourbible_components/buttons/YourBibleLessonButtons";
import YourBibleLessonEntry from "../components/yourbible_components/YourBibleLessonEntry";

interface accessTokenProp {
    id: string;
    accessToken: string
}

interface BibleNoteProp {
    bibleVerse: string,
    bibleVerseNote: string
}

/*interface BibleNotesProp {
    _id: string,
    bibleVerseNotes: Array<BibleNoteProp>
    date: string,
    title: string,
    userId: string
}*/

interface AuthProp {
    auth: accessTokenProp
}

interface ErrorProp {
    response: string
}

export interface BibleLessonContextProp {
    bibleStudyId: string | undefined
}

export const BibleLesson_Context = createContext<BibleLessonContextProp>({ bibleStudyId: '' });

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
                <BibleLesson_Context.Provider value={{ bibleStudyId }}>
                    <YourBibleLessonButtons />
                </BibleLesson_Context.Provider>

                <div className="flex flex-col">
                    {bibleNotes.map((bibleNote) =>
                        <YourBibleLessonEntry
                            key={uuidv4()}
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