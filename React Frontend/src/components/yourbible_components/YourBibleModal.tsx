// Modal used to create new Bible study notes and edit existing ones
interface YourBibleModalProp {
    modalVisible: boolean,
    title: string,
    updateTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
    submit: (e: any) => void,
    onClickClose: () => void,
    errorMessage: string
}

const YourBibleModal = ({ title, updateTitle, modalVisible,
                         onClickClose, submit, errorMessage}: YourBibleModalProp) => {

    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <p className="text-xl mb-2">Enter Bible Lesson</p>
                    <input 
                        id="title"
                        type="text"
                        value={title}
                        className="border-2 border-white rounded-lg mb-2 p-2"
                        onChange={updateTitle} 
                        placeholder="Enter Title" />
                </form>
                <div className="flex justify-between">
                    <button
                        className="btn mt-2"
                        onClick={onClickClose}>
                        Close</button>
                    <button 
                        className="btn mt-2"
                        disabled={errorMessage !== ''}
                        onClick={submit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default YourBibleModal;