import { useEffect, useState } from "react";
import EditYourBibleLessonModal from "./modals/EditYourBibleLessonModal";

interface YourBibleLessonEntryProp {
    id: string | undefined,
    index: number,
    bibleVerse: string,
    bibleVerseNotes: string
}

const YourBibleLessonEntry = ({ id, index,
     bibleVerse, bibleVerseNotes }: YourBibleLessonEntryProp) => {
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);

    const clickEdit = () => {
        setModalVisible(true);
    }

    const toggleModalVisible = () => {
        setModalVisible(false);
    }

    return(
        <div className="flex flex-col">
            <div className="flex flex-row mb-6">
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        {bibleVerse}
                    </div>
                    <div className="collapse-content">
                        {bibleVerseNotes}
                    </div>
                </div>
                <div className="flex flex-col ml-5">
                        <label 
                            className="mb-2 bg-slate-400 text-black btn btn-sm"
                            htmlFor="updateBibleStudy"
                            onClick={clickEdit}>Edit</label>
                            <input
                                type="checkbox"
                                id="updateBibleLesson"
                                className="modal-toggle"
                                readOnly
                                checked={modalVisible}
                            />
                            <EditYourBibleLessonModal
                                id={id}
                                index={index}
                                bibleVerse={bibleVerse}
                                bibleVerseNotes={bibleVerseNotes}
                                modalVisible={modalVisible} 
                                toggleModalVisible={toggleModalVisible}
                            />

                        <label
                            className="bg-red-600 text-black btn btn-sm"
                            htmlFor="deleteBibleStudy">Delete</label>
                    </div>
            </div>
        </div>
    );
};

export default YourBibleLessonEntry;