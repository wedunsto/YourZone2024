// Modal used to create new budget and edit existing budgets

interface BudgetModalProp {
    modalVisible: boolean,
    description: string,
    amount: number,
    amountPerCheck: number,
    updateDescription: ((e: React.ChangeEvent<HTMLInputElement>) => void),
    updateAmount: ((e: React.ChangeEvent<HTMLInputElement>) => void),
    updateAmountPerCheck: ((e: React.ChangeEvent<HTMLInputElement>) => void),
    updateSubmittedDate: ((e: React.ChangeEvent<HTMLInputElement>) => void),
    updateFutureDate: ((e: React.ChangeEvent<HTMLInputElement>) => void),
    onClickClose: (() => void)
    onClickSubmit: (() => void)
}

const BudgetModal = ({ modalVisible, description, amount, 
    amountPerCheck, updateDescription, updateAmount, 
    updateAmountPerCheck, updateSubmittedDate, updateFutureDate,
    onClickClose, onClickSubmit }: BudgetModalProp) => {
        return(
            <div className={`modal ${modalVisible ? 'visible' : ''}`}>
                <div className="modal-box">
                    <form className="flex flex-col rounded-lg">
                        <div>
                            <p className="text-2xl mb-2">Budget description:</p>
                                <input
                                    placeholder="Enter budget description"
                                    id="budgetDescription"
                                    type="text"
                                    value={description}
                                    onChange={updateDescription}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl mb-2">Budget amount:</p>
                                <input
                                    placeholder="Enter budget amount"
                                    id="budgetAmount"
                                    type="number"
                                    step="0.01"
                                    value={amount}
                                    onChange={updateAmount}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl mb-2">Amount per check:</p>
                                <input
                                    placeholder="Enter amount per check"
                                    id="amountPerCheck"
                                    type="number"
                                    step="0.01"
                                    value={amountPerCheck}
                                    onChange={updateAmountPerCheck}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl">Budget submitted date:</p>
                                <input
                                    placeholder="Enter submitted date"
                                    type="date"
                                    onChange={updateSubmittedDate}
                                    className="border-2 p-2 text-lg border-white rounded-lg p2" />
                                <p className="text-2xl">Budget future date:</p>
                                <input
                                    placeholder="Enter future date"
                                    type="date"
                                    onChange={updateFutureDate}
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

export default BudgetModal;