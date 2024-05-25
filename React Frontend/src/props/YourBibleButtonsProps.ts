import { BibleNoteProp } from "./BibleLessonProps";

export interface YourBibleButtonsProp {
    buttonTitle: string,
    bibleStudyId: string | undefined,
    bibleNotes: Array<BibleNoteProp>
    submittedBool: boolean,
    setSubmittedFtn: (value: boolean) => void;
}