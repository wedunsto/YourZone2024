import { useParams } from "react-router-dom";

const BibleLessonView = () => {
    let { bibleLesson } = useParams();

    return (
        <div>
            <p className="text-black text-2xl">{bibleLesson}</p>
        </div>
    );
};

export default BibleLessonView;