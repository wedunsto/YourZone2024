/*
 * Button used to add income or expense to YourBudget
 * Transaction table
 */
import { useState } from 'react';
import AddTransactionModal from '../modals/AddTransactionModal';
import { createTransaction } from '../../../helper/yourbudget_helper/CreateTransaction';
import useAuth from '../../../hooks/useAuth';
import { AuthProp } from '../../../props/CommonProps';

interface AddTransactionButtonProp {
    rerender: ()=> void,
    income: boolean
}

const AddTransactionButton =({rerender, income}: AddTransactionButtonProp) => {
    const labelText = income ? "Add Income" : "Add Expense"
    const functionCall = income ? "addIncome" : "addExpense"

    const { auth } = useAuth() as AuthProp;

    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ amount, setAmount ] = useState<number>(0);
    const [ description, setDescription ] = useState<string>("");
    const [ date, setDate ] = useState<Date>(new Date());
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const onClickAddTransaction = () => {
        setModalVisible(true);
    }

    const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }

    const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(Date.parse(e.target.value + "T00:00:00")));
    }

    const onClickSubmit = () => {
        createTransaction(auth.id, auth.accessToken, description, 
            amount, date, income, setErrorMessage);
        rerender();
        setAmount(0);
        setDescription("");
        setDate(new Date());
        setModalVisible(false);
    }

    const onClickClose = () => {
        setModalVisible(false);
    }

    return(
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <label
                className="btn text-white text-lg"
                onClick={onClickAddTransaction}
                htmlFor={functionCall}>{labelText}</label>
            <input 
                type="checkbox"
                id= "createTransaction"
                className= "modal-toggle"
                readOnly
                checked={modalVisible} />
            <AddTransactionModal 
                modalVisible={modalVisible} 
                income={income} 
                description={description} 
                amount={amount} 
                updateDescription={updateDescription} 
                updateAmount={updateAmount} 
                updateDate={updateDate} 
                onClickSubmit={onClickSubmit} 
                onClickClose={onClickClose} />
            
        </div>
    );
}

export default AddTransactionButton;