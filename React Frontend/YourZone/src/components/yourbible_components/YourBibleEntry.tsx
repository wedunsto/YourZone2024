// Collapsable table entries for YourBible

interface YourBibleEntryProp{
    id: string,
    collapseText: string,
    bibleVerses: string[],
    expandText: string,
}
const YourBibleEntry = ({id, collapseText, bibleVerses, expandText}: YourBibleEntryProp) => {
    const lineSeperatedNotes = expandText.split(/\n/g);

    return (
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
    );
}

export default YourBibleEntry;