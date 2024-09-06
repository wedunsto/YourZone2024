// Modal used to create a new YourBible entry
interface NewYourBibleEntryModalProp {
    modalVisible: boolean;
    title: string;
    updateTitle: undefined | ((e: React.ChangeEvent<HTMLInputElement>) => void);
}

const NewYourBibleEntryModal = ( { modalVisible, title, updateTitle }: NewYourBibleEntryModalProp ) => {
    const CREATE_BIBLE_URL = '/createBibleStudyNote';

    const createNewBibleStudy = async () => {

    }

    return (
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <p className="text-xl mb-2">Enter Bible Lesson Title</p>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateTitle}
                        placeholder="Enter Title"
                    />
                </form>
                <div className="flex justify-between">
                    <button
                        className="btn mt-2"
                        onClick={}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default NewYourBibleEntryModal;