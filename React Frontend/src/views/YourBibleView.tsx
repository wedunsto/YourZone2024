// View for all current Bible notes, and buttons to add, edit, and delete Bible notes
import YourBibleButtons from "../components/yourbible_components/YourBibleButtons";
import YourBibleHeader from "../components/yourbible_components/YourBibleHeader";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import YourBibleEntry from "../components/yourbible_components/YourBibleEntry";
import { v4 as uuidv4 } from 'uuid';

// Explicit types for properties in this component
interface accessTokenProp {
    id: string;
    accessToken: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface ErrorProp {
    response: string
}

interface NoteProp {
    _id: string
    type: string
    title: string
    bibleverses: Array<string>
    notes: string
}

const YourBibleView = () => {
    const { auth } = useAuth() as AuthProp;

    const BIBLE_URL = `/getBibleStudyNotes?userId=${auth.id}`;

    const [bibleNotes, setBibleNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // On page load, get all exisiting Bible notes
    // Repload the page when the submitted boolean changes
    useEffect(() => {
        const getBibleStudyNotes = async () => {
            try {
                const response = await axios.get(BIBLE_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                setBibleNotes(response?.data);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        }

        getBibleStudyNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[submitted]);

    return(
        <div className="h-screen w-screen grow">
            {errorMessage? <p>{errorMessage}</p> : null}
            <div className="grow flex justify-center">
                <YourBibleHeader />
            </div>
            <div className="flex flex-row ml-5 justify-center">
                <YourBibleButtons 
                    submittedBool={submitted}
                    setSubmittedFtn={setSubmitted} />
                <div className="flex flex-col">
                    {
                        bibleNotes.map((note: NoteProp) => 
                            <YourBibleEntry 
                                key={uuidv4()}
                                id={note._id}
                                type={note.type}
                                collapseText={note.title}
                                bibleVerses={note.bibleverses}
                                expandText={note.notes}
                                submitted={submitted}
                                setSubmitted={setSubmitted}/>)
                    }
                </div>
            </div>
        </div>
    );
}

export default YourBibleView;