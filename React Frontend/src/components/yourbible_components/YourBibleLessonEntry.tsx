interface YourBibleLessonEntryProp {
    collapseText: string,
    expandedText: string
}

const YourBibleLessonEntry = ({collapseText, expandedText}: YourBibleLessonEntryProp) => {
    return(
        <div className="flex flex-col">
            <div className="flex flex-row mb-6">
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        {collapseText}
                    </div>
                    <div className="collapse-content">
                        {expandedText}
                    </div>
                </div>
                <div className="flex flex-col ml-5">
                        <label 
                            className="mb-2 bg-slate-400 text-black btn btn-sm"
                            htmlFor="updateBibleStudy">Edit</label>

                        <label
                            className="bg-red-600 text-black btn btn-sm"
                            htmlFor="deleteBibleStudy">Delete</label>
                    </div>
            </div>
        </div>
    );
};

export default YourBibleLessonEntry;