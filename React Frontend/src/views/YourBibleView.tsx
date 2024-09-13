// View for all current Bible notes, and buttons to add, edit, and delete Bible notes
// Create a note, then enter that note to add supporting Bible verses
import "../styles/YourBibleStyles.css";
import "../../assets/images/OpenBible.jpeg"
import { useEffect, useState, createContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Outlet, useLocation } from 'react-router-dom';
import Header from "../components/Header";
import YourBibleButtons from "../components/yourbible_components/buttons/YourBibleButtons";
import YourBibleEntry from "../components/yourbible_components/YourBibleEntry";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { AuthProp } from "../props/CommonProps";

interface BibleVerseNote {
    bibleVerse: string;
    bibleVerseNote: string;
}

interface NoteProp {
    _id: string;
    userId: string;
    title: string;
    biblerVerseNotes: Array<BibleVerseNote>
    date: Date
}

export interface ContextProp {
    toggleSubmitted: () => void;
}

export const YourBible_Context = createContext<ContextProp>({toggleSubmitted: () => {}});

const YourBibleView = () => {
    const { auth } = useAuth() as AuthProp;

    const GET_BIBLE_URL = `/getBibleStudyNotes?userId=${auth.id}`;

    const [bibleNotes, setBibleNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Used to conditionally render the parent and child route
    const location = useLocation();
    const hasSubPath = location.pathname !== "/yourbible";

    // On page load, get all exisiting Bible notes
    // Reload the page when the submitted boolean changes
    useEffect(() => {
        const getBibleStudyNotes = async () => {
            try {
                const response = await axios.get(GET_BIBLE_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                setBibleNotes(response?.data);
            } catch(err) {
                setErrorMessage(`${err}`);
            }
        }

        getBibleStudyNotes();
    },[submitted]);

    const toggleSubmitted = () => {
        setSubmitted(!submitted);
    }

    return(
        <div className="your-bible-page-background h-screen w-screen">
            <div className="grow flex justify-center">
                <Header textColor="text-black" title="YourBible" subTitle="His word, your light"/>
            </div>
            
            { hasSubPath ? (
                <Outlet />
                ) : (
                <YourBible_Context.Provider value={{toggleSubmitted}}>
                    <>
                        {errorMessage? <p>{errorMessage}</p> : null}
                        <div className="flex flex-row ml-5 mt-5">
                            <YourBibleButtons />
                            <div className="flex flex-col">
                                {
                                    bibleNotes.map((note: NoteProp) => 
                                        <YourBibleEntry 
                                            key={uuidv4()}
                                            id={note._id}
                                            title={note.title}/>
                                    )
                                }
                            </div>
                        </div>
                    </>
                </YourBible_Context.Provider>  
                )
            }
        </div>
    );
}

export default YourBibleView;