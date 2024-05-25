export interface BibleNoteProp {
    bibleVerse: string,
    bibleVerseNote: string
}

export interface BibleNotesProp {
    _id: string,
    bibleVerseNotes: Array<BibleNoteProp>
    date: string,
    title: string,
    userId: string
}