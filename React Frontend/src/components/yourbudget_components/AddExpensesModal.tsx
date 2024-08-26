// Modal used to create new expenses and edit existing expenses

interface YourBudgetModalProp {
    modalVisible: boolean,
    expenseId: string,
    expenseName: string,
    expenseCost: number,
    updateExpenseName: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateExpenseCost: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    onClickClose: (() => void)
    createExpense: ((e: any) => void)
}

const YourBudgetModal =({ modalVisible, expenseName, expenseCost, updateExpenseName, 
                        updateExpenseCost, onClickClose, createExpense }: YourBudgetModalProp) => {
    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
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
                            className="border-2 p-2 text-lg border-white rounded-lg p2" />
                    </div>
                </form>
                <div className="flex justify-between">
                    <button className="btn mt-2 text-lg text-white" onClick={onClickClose}>Close</button>
                    <button className="btn mt-2 text-lg text-white" onClick={createExpense}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default YourBudgetModal;