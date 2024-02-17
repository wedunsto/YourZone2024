// Collapsable table entries for YourBible
import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const BIBLE_URL = '/updateBibleStudy';

interface YourBibleEntryProp{
    id: string,
    type: string,
    collapseText: string,
    bibleVerses: string[],
    expandText: string,
}
const YourBibleEntry = ({id, type, collapseText, bibleVerses, expandText}: YourBibleEntryProp) => {
    const [newType, setNewType] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newBibleVerses, setNewBibleVerses] = useState('');
    const [newBibleNotes, setNewBibleNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const { auth } = useAuth() as any;

    const lineSeperatedNotes = expandText.split(/\n/g);

    const updateBibleStudy = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(BIBLE_URL,
                JSON.stringify({ id, type, "title": collapseText, "bibleverses": bibleVerses, "notes": expandText }),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`},
                        withCredentials: true
                });
        } catch(err) {

        }
    }

    return (
        <div className="flex flex-row">
            <div className="mb-4 collapse collapse-arrow bg-base-200">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                {collapseText}
            </div>
            <div className="collapse-content">
                {bibleVerses.map((bibleVerse: string, index: number) => (
                        bibleVerses.length == 1 || index == bibleVerses.length - 1? (
                            <span>{bibleVerse}</span>
                        ) : <span>{bibleVerse}, </span>
                    )
                )}
                <div className="divider"></div>
                <ul className="list-disc">
                    {lineSeperatedNotes.map((note: string) => <li key={id}>{note}</li>)}
                </ul> 
            </div>
        </div>
            <button 
                className="ml-5 bg-slate-400 text-black btn btn-sm"
                onClick={() => console.log("test")}>Edit</button>
        </div>
    );
}

export default YourBibleEntry;