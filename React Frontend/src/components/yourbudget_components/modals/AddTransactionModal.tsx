// Modal used to create new transactions and edit existing expenses

interface YourBudgetModalProp {
    modalVisible: boolean,
    income: boolean,
    description: string,
    amount: number,
    updateDescription: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateAmount: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateDate: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    onClickSubmit: ((e: any) => void)
    onClickClose: (() => void)
}

const YourBudgetModal =({ modalVisible, income, description, amount, updateDescription, updateAmount, updateDate, 
    onClickSubmit, onClickClose }: YourBudgetModalProp) => {
        return(
            <div className={`modal ${modalVisible ? 'visible' : ''}`}>
                <div className="modal-box">
                    <form className="flex flex-col rounded-lg">
                        <div>
                            <p className="text-2xl mb-2">{income? "Income" : "Expense"} name:</p>
                                <input
                                    placeholder="Enter expense name"
                                    id="expenseName"
                                    type="text"
                                    value={description}
                                    onChange={updateDescription}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl mb-2">{income? "Income" : "Expense"} amount:</p>
                                <input
                                    placeholder="Enter Expense"
                                    id="expenseCost"
                                    type="number"
                                    step="0.01"
                                    value={amount}
                                    onChange={updateAmount}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl">{income? "Income" : "Expense"} date:</p>
                                <input
                                    placeholder="Enter Date"
                                    type="date"
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

export default YourBudgetModal;