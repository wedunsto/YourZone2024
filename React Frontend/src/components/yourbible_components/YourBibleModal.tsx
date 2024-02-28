// Modal used to create new Bible study notes and edit existing ones
interface YourBibleModalProp {
    type: string,
    title: string,
    bibleVerses: string,
    bibleNotes: string,
    updateType: (e: any) => void,
    updateTitle: (e: any) => void,
    updateBibleVerses: (e: any) => void,
    updateBibleNotes: (e: any) => void,
    clearFields: () => void,
    createBibleStudy: (e: any) => void
}

const YourBibleModal = ({type, title, bibleVerses, 
                         bibleNotes, updateType,
                         updateTitle, updateBibleVerses,
                         updateBibleNotes, clearFields, createBibleStudy}: YourBibleModalProp) => {
                            
    return(
        <div className="modal">
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <div className="flex flex-row">
                        <div className="flex flex-row m-4">
                            <span className="label-text mr-2">Bible Notes</span>
                            <input 
                                type="radio"
                                value={"BibleNotes"}
                                checked={type === "BibleNotes"}
                                className="radio" onChange={updateType} />
                        </div>
                        <div className="flex flex-row m-4">
                            <span className="label-text mr-2">Sermon Notes</span>
                            <input 
                                type="radio"
                                value={"SermonNotes"}
                                checked={type === "SermonNotes"}
                                className="radio" onChange={updateType} />
                        </div>
                        <div className="flex flex-row m-4">
                            <span className="label-text mr-2">Service Notes</span>
                            <input 
                                type="radio"
                                value={"ServiceNotes"}
                                checked={type === "ServiceNotes"}
                                className="radio" onChange={updateType} />
                        </div>
                    </div>
                    <input 
                        id="title"
                        type="text"
                        value={title}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateTitle} 
                        placeholder="Enter Title" />
                    <input 
                        id="bibleverses"
                        type="text"
                        value={bibleVerses}
                        className="border-2 border-white rounded-lg my-2 p-2"
                        onChange={updateBibleVerses}
                        placeholder="Enter Bible verses" />
                    <textarea
                        id="notes"
                        value={bibleNotes}
                        className="border-2 border-white rounded-lg my-2 p-2"
                        onChange={updateBibleNotes}
                        placeholder="Enter Bible Notes" />
                </form>
                <div className="flex justify-between">
                    <label 
                        htmlFor="createBibleStudy"
                        className="btn mt-2"
                        onClick={clearFields}>Close</label>
                    <label
                        htmlFor="createBibleStudy"
                        className="btn mt-2"
                        onClick={createBibleStudy}>Submit</label>
                </div>
            </div>
        </div>
    );
}

export default YourBibleModal;