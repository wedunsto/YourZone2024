import YourBibleButtons from "../components/yourbible_components/YourBibleButtons";
import YourBibleHeader from "../components/yourbible_components/YourBibleHeader";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import YourBibleEntry from "../components/yourbible_components/YourBibleEntry";

const BIBLE_URL = '/getBibleStudyNotes';

const YourBibleView = () => {
    const { auth } = useAuth() as any;

    const [bibleNotes, setBibleVerse] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

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
                setBibleVerse(response?.data);
            } catch(err) {
                setErrorMessage((err as any).response);
            }
        }

        getBibleStudyNotes();
    },[submitted]);

    return(
        <div>
            <div className="grow flex justify-center">
                <YourBibleHeader />
            </div>
            <div className="flex flex-row ml-5">
                <YourBibleButtons 
                    submittedBool={submitted}
                    setSubmittedFtn={setSubmitted} />
                <div className="flex flex-col">
                    {
                        bibleNotes.map((note: any) => 
                            <YourBibleEntry 
                                key={note._id}
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