interface AddIncomeModalProp {
    modalVisible: boolean
    incomeName: string,
    income: number,
    updateIncomeName: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateIncome: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateIncomeDate: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    onClickSubmit: ((e: any) => void)
    onClickClose: (() => void)
}

const AddIncomeModal = ( { modalVisible, incomeName, updateIncomeName,
                            updateIncome, updateIncomeDate, onClickSubmit,
                            onClickClose }: AddIncomeModalProp ) => {
    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <div>
                        <p className="text-2xl">Income Name:</p>
                        <input
                            placeholder="Enter expense name"
                            id="incomeName"
                            type="text"
                            value={incomeName}
                            onChange={updateIncomeName}
                            className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                        <p className="text-2xl">Income Value:</p>
                        <input 
                            placeholder="Enter income value"
                            id="incomevalue"
                            type="number"
                            step="0.01"
                            onChange={updateIncome}
                            className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                        <p className="text-2xl">Income Date:</p>
                        <input
                            type="date"
                            onChange={updateIncomeDate}
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

export default AddIncomeModal;