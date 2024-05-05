import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

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

const BibleLessonView = () => {
    let { bibleLessonId } = useParams();
    const BIBLE_LESSON_URL = `/getBibleLessonNotes?bibleStudyId=${bibleLessonId}`;
    const { auth } = useAuth() as AuthProp;

    const [bibleNotes, setBibleNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        console.log("test");
        const getBibleStudyNotes = async () => {
            try {
                const response = await axios.get(BIBLE_LESSON_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });

                setBibleNotes(response?.data);
                console.log(response);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        }

        getBibleStudyNotes();
    },[submitted]);

    return (
        <div>
            <p className="text-black text-2xl">{bibleLessonId}</p>
        </div>
    );
};

export default BibleLessonView;