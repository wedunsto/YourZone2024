// Modal used to create new transactions and edit existing expenses

interface EditModalProp {
    modalVisible: boolean,
    description: string,
    amount: number,
    date: string,
    updateDescription: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateAmount: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    onClickSubmit: ((e: any) => void)
    onClickClose: (() => void)
}

const EditTransactionModal =({ modalVisible, description,
    amount, date, updateDescription, updateAmount, updateDate, 
    onClickSubmit, onClickClose }: EditModalProp) => {
        return(
            <div className={`modal ${modalVisible ? 'visible' : ''}`}>
                <div className="modal-box">
                    <form className="flex flex-col rounded-lg">
                        <div>
                            <p className="text-2xl mb-2">Transaction description:</p>
                                <input
                                    placeholder="Enter expense name"
                                    id="expenseName"
                                    type="text"
                                    value={description}
                                    onChange={updateDescription}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl mb-2">Transaction amount:</p>
                                <input
                                    placeholder="Enter Expense"
                                    id="expenseCost"
                                    type="number"
                                    step="0.01"
                                    value={amount.toFixed(2)}
                                    onChange={updateAmount}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl">Transaction date:</p>
                                <input
                                    placeholder="Enter Date"
                                    type="date"
                                    value={date}
                                    onChange={updateDate}
                                    className="border-2 p-2 text-lg border-white rounded-lg p2" />
                        </div>
                    </form>
                    <div className="flex justify-between">
                        <button className="btn mt-2 text-lg text-white" onClick={onClickClose}>Close</button>
                        <button className="btn mt-2 text-lg text-white" onClick={onClickSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
}

export default EditTransactionModal;