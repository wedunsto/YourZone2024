/*
 * Button used to add income or expense to YourBudget
 * Transaction table
 */
import { useState } from 'react';
import AddTransactionModal from '../modals/AddTransactionModal';
import { createTransaction } from '../../../helper/yourbudget_helper/CreateTransaction';
import { TransactionsProp } from '../../../props/YourExpensesProps';
import useAuth from '../../../hooks/useAuth';
import { AuthProp } from '../../../props/CommonProps';
import { formatCurrency } from '../../../helper/yourbudget_helper/FormatCurrency';

interface AddTransactionButtonProp {
    income: boolean,
    totalFunds: string,
    setTransactions: ((e: any) => void),
    setTotalFunds: ((e: any) => void)
}

const AddTransactionButton =({ income, totalFunds, setTransactions, setTotalFunds }: AddTransactionButtonProp) => {
    const { auth } = useAuth() as AuthProp;

    const labelText = income ? "Add Income" : "Add Expense"
    const functionCall = income ? "addIncome" : "addExpense"

    const [ transactionModalVisible, setTransactionModalVisible ] = useState<boolean>(false);
    const [ amount, setAmount ] = useState<number>(0);
    const [ description, setDescription ] = useState<string>("");
    const [ date, setDate ] = useState<Date>(new Date());
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const onClickAddTransaction = () => {
        setTransactionModalVisible(true);
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

    // Update the total funds and transactions array based on the transaction being added
    const addTransaction = (newTransaction: TransactionsProp) => {
        const convertedNewAmount = Number(newTransaction.amount.$numberDecimal.replace(/[$,]/g, ''));
        const convertedTotalFunds = Number(totalFunds.replace(/[$,]/g, ''));

        setTotalFunds(formatCurrency(convertedTotalFunds + convertedNewAmount));
        setTransactions((prevTransactions: Array<TransactionsProp>) => [...prevTransactions, newTransaction]);
    }

    const onClickSubmit = async () => {
        const newTransaction = await createTransaction(auth.id, auth.accessToken, description, amount, date, income, setErrorMessage);
        
        if (newTransaction) {
            addTransaction(newTransaction);
        }
        
        setAmount(0);
        setDescription("");
        setDate(new Date());
        setTransactionModalVisible(false);
    }

    const onClickClose = () => {
        setTransactionModalVisible(false);
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
                checked={transactionModalVisible} />
            <AddTransactionModal 
                modalVisible={transactionModalVisible} 
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