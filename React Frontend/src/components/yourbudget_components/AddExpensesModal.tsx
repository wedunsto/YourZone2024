// Modal used to create new expenses and edit existing expenses

interface YourBudgetModalProp {
    modalVisible: boolean,
    expenseId: string,
    expenseName: string,
    expenseCost: number,
    expenseDate: Date,
    expensesLength: number,
    updateExpenseName: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateExpenseCost: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateExpenseDate: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    onClickSubmit: ((e: any) => void)
    onClickClose: (() => void)
}

const YourBudgetModal =({ modalVisible, expenseName, expenseCost, expenseDate,
                          expensesLength, updateExpenseName, updateExpenseDate,
                        updateExpenseCost, onClickSubmit, onClickClose }: YourBudgetModalProp) => {
    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <div>
                        {expensesLength === 0?
                            <div>
                                <p className="text-2xl mb-2">Initial funds:</p>
                                <input 
                                    placeholder="Enter initial funds"
                                    id="expenseCost"
                                    type="number"
                                    step="0.01"
                                    onChange={updateExpenseCost}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl">Start Date:</p>
                                <input
                                    type="date"
                                    onChange={updateExpenseDate}
                                    className="border-2 p-2 text-lg border-white rounded-lg p2" />
                            </div> 
                            : 
                            <div>
                                <p className="text-2xl mb-2">Expense name:</p>
                                <input
                                    placeholder="Enter expense name"
                                    id="expenseName"
                                    type="text"
                                    value={expenseName}
                                    onChange={updateExpenseName}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl mb-2">Expense Cost:</p>
                                <input
                                    placeholder="Enter Expense"
                                    id="expenseCost"
                                    type="number"
                                    step="0.01"
                                    value={expenseCost}
                                    onChange={updateExpenseCost}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl">Expense Date:</p>
                                <input
                                    placeholder="Enter Date"
                                    type="date"
                                    onChange={updateExpenseDate}
                                    className="border-2 p-2 text-lg border-white rounded-lg p2" />
                            </div>
                        }
                    </div>
                </form>
                <div className="flex justify-between">
                    <button className="btn mt-2 text-lg text-white" onClick={onClickClose}>Close</button>
                    <button className="btn mt-2 text-lg text-white" onClick={onClickSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default YourBudgetModal;