// import useAuth from "../../hooks/useAuth";

// Modal used to create new Bible study notes and edit existing ones
interface BibleNoteProp {
    bibleVerse: string,
    bibleVerseNote: string
}

interface accessTokenProp {
    accessToken: string,
    id: string
}

interface AuthProp {
    auth: accessTokenProp
}

interface YourBibleModalProp {
    modalVisible: undefined | boolean,
    bibleStudyId: undefined | string,
    buttonTitle: undefined | string,
    title: undefined | string,
    updateTitle: undefined | ((e: React.ChangeEvent<HTMLInputElement>) => void),
    bibleVerse: undefined | string,
    bibleVerseNote: undefined | string,
    bibleVerseNotes: undefined | Array<BibleNoteProp>
    updateBibleVerse: undefined | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateBibleNotes: undefined | ((e: any) => void),
    createNewBibleStudy: undefined | ((e: any) => void),
    createNewBibleLesson: undefined | ((e: any) => void),
    onClickClose: undefined | (() => void),
    errorMessage: string
}

const YourBibleModal = ({ buttonTitle, title, updateTitle, bibleVerse, updateBibleVerse, modalVisible,
                         onClickClose, createNewBibleStudy, createNewBibleLesson, errorMessage}: YourBibleModalProp) => {

    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    {
                        buttonTitle=="Add Bible Verse Notes"?
                        <div>
                            <p className="text-xl mb-2">Enter Bible verse and notes</p>
                            <input 
                                id="bibleVerse"
                                type="text"
                                value={bibleVerse}
                                className="border-2 border-white rounded-lg mb-2 p-2"
                                onChange={updateBibleVerse} 
                                placeholder="Enter Bible Verse" />
                        </div>
                        :
                        <div>
                            <p className="text-xl mb-2">Enter Bible Lesson</p>
                                <input 
                                    id="title"
                                    type="text"
                                    value={title}
                                    className="border-2 border-white rounded-lg mb-2 p-2"
                                    onChange={updateTitle} 
                                    placeholder="Enter Title" />
                        </div>
                    }
                </form>
                <div className="flex justify-between">
                    <button
                        className="btn mt-2"
                        onClick={onClickClose}>
                        Close</button>
                    {
                        buttonTitle=="Add Bible Verse Notes"?
                        <button 
                        className="btn mt-2"
                        disabled={errorMessage !== ''}
                        onClick={createNewBibleLesson}>Submit</button>
                        :
                        <button 
                        className="btn mt-2"
                        disabled={errorMessage !== ''}
                        onClick={createNewBibleStudy}>Submit</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default YourBibleModal;