// Modal used to create initial balance for YourBudget transactions
import { useState } from 'react';
import { createTransaction } from '../../../helper/yourbudget_helper/CreateTransaction';
import { TransactionsProp } from '../../../props/YourExpensesProps';
import useAuth from '../../../hooks/useAuth';
import { AuthProp } from '../../../props/CommonProps';
import { formatCurrency } from '../../../helper/yourbudget_helper/FormatCurrency';

interface InitialBalanceModalProp {
    modalVisible: boolean,
    setModalVisible: (e:any) => void,
    setErrorMessage: (errorMessage: string) => void,
    setTransactions: (e:any) => void,
    setTotalFunds: (e:any) => void,
}

const InitialBalanceModal = ({ modalVisible, setModalVisible, setTransactions, 
    setTotalFunds, setErrorMessage }: InitialBalanceModalProp) => {
    const { auth } = useAuth() as AuthProp;

    const [ amount, setAmount ] = useState<number>(0);
    const [ date, setDate ] = useState<Date>(new Date());

    const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }

    const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(Date.parse(e.target.value + "T00:00:00")));
    }

    const onClickSubmit =async () => {
        const initialBalance = await createTransaction(auth.id, auth.accessToken, "Initial Balance",
            amount, date, true, setErrorMessage);
        setTransactions((prevTransactions: Array<TransactionsProp>) => [
            ...prevTransactions, initialBalance
        ]);
        setTotalFunds(formatCurrency(amount));
        setModalVisible(false);
    }

    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <div>
                        <p className="text-2xl mb-2">Initial Transaction Balance:</p>
                        <input
                            placeholder="Enter Balance"
                            id="initialBalance"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={updateAmount}
                            className="border-2 p-2 text-lg border-white rounded-lg mb-2 p2" />
                            <p>Initial Balance Date:</p>
                            <input
                                placeholder="Enter Date"
                                onChange={updateDate}
                                type="date"
                                className="border-2 p-2 text-lg border-white rounded-lg p2" />
                    </div>
                </form>
                <button className="btn mt-2 text-lg text-white" onClick={onClickSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default InitialBalanceModal;