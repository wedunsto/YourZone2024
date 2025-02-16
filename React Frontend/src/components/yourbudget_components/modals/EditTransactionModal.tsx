// Modal used to create new transactions and edit existing expenses

import { useState } from "react"
import axios from "../../../api/axios"
import useAuth from "../../../hooks/useAuth"
import { AuthProp } from "../../../props/CommonProps"

interface EditModalProp {
    modalVisible: boolean,
    id: string,
    description: string,
    amount: number,
    date: string,
    updateDescription: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateAmount: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    updateDate: ((e: React.ChangeEvent<HTMLInputElement>) => void)
    onClickSubmit: ((e: any) => void)
    onClickDelete: ((e: any) => void)
    onClickClose: (() => void)
}

const EditTransactionModal =({ modalVisible, description,
    amount, date, updateDescription, updateAmount, updateDate, 
    onClickSubmit, onClickDelete, onClickClose }: EditModalProp) => {

        const [errorMessage, setErrorMessage] = useState<string>("");

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
                                    defaultValue={date}
                                    onChange={updateDate}
                                    className="border-2 p-2 text-lg border-white rounded-lg p2" />
                        </div>
                    </form>
                    <div className="flex justify-between">
                        <button className="btn mt-2 text-lg text-white" onClick={onClickClose}>Close</button>
                        <button className="btn mt-2 text-lg text-white" onClick={onClickSubmit}>Submit</button>
                        <button className="btn mt-2 text-lg bg-red text-white" onClick={onClickDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
}

export default EditTransactionModal;