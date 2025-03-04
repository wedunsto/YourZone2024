// Modal used to create new transactions and edit existing expenses

import { useState } from "react"

interface EditModalProp {
    modalVisible: boolean,
    id: string,
    description: string,
    amount: number,
    amountPP: number,
    subDate: string,
    futDate: string,
    updateDescription: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateAmount: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateAmountPP: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateSubDate: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateFutDate: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    onClickSubmit: ((e: any) => void)
    onClickDelete: ((e: any) => void)
    onClickClose: (() => void)
}

const EditBudgetModal =({ modalVisible, description,
    amount, amountPP, subDate, futDate, updateDescription, updateAmount, updateAmountPP, 
    updateSubDate, updateFutDate, onClickSubmit, onClickDelete, onClickClose }: EditModalProp) => {

        const [errorMessage, setErrorMessage] = useState<string>("");

        return(
            <div className={`modal ${modalVisible ? 'visible' : ''}`}>
                <div className="modal-box">
                    <form className="flex flex-col rounded-lg">
                        <div>
                            <p className="text-2xl mb-2">Budget description:</p>
                                <input
                                    placeholder="Enter budget name"
                                    id="budgetName"
                                    type="text"
                                    value={description}
                                    onChange={updateDescription}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl mb-2">Budget amount:</p>
                                <input
                                    placeholder="Enter budget amount"
                                    id="budgetCost"
                                    type="number"
                                    step="0.01"
                                    value={amount.toFixed(2)}
                                    onChange={updateAmount}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl mb-2">Budget amount per paycheck:</p>
                                <input
                                    placeholder="Enter budget amount"
                                    id="budgetCost"
                                    type="number"
                                    step="0.01"
                                    value={amountPP.toFixed(2)}
                                    onChange={updateAmountPP}
                                    className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                                <p className="text-2xl">Budget submit date:</p>
                                <input
                                    placeholder="Enter date"
                                    type="date"
                                    defaultValue={subDate}
                                    onChange={updateSubDate}
                                    className="border-2 p-2 text-lg border-white rounded-lg p2" />
                                <p className="text-2xl">Budget future date:</p>
                                <input
                                    placeholder="Enter date"
                                    type="date"
                                    defaultValue={futDate}
                                    onChange={updateFutDate}
                                    className="border-2 p-2 text-lg border-white rounded-lg p2" />
                        </div>
                    </form>
                    <div className="flex justify-between">
                        <button className="btn mt-2 text-lg text-white" onClick={onClickClose}>Close</button>
                        <button className="btn mt-2 text-lg text-white" onClick={onClickSubmit}>Update</button>
                        <button className="btn mt-2 text-lg bg-red text-white" onClick={onClickDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
}

export default EditBudgetModal;