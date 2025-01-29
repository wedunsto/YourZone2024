/**
 * Modal used to edit or delete a transaction or budget
 */

interface EditModalProp {
    modalVisible: boolean
}

const EditModal = ({ modalVisible }: EditModalProp) => {
    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <div>
                        <p className="text-2xl mb-2">Transaction</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;