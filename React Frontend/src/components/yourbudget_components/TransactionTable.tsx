// Table of transactions for the logged in user

import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from '../../helper/yourbudget_helper/FormatCurrency';
import EditTransactionModal from './modals/EditTransactionModal';
import { updateTransaction } from '../../helper/yourbudget_helper/EditTransaction';
import { deleteTransaction } from '../../helper/yourbudget_helper/DeleteTransaction';
import { AuthProp } from '../../props/CommonProps';
import useAuth from '../../hooks/useAuth';
import { YourBudget_Context, YourBudget_ContextProp } from '../../views/YourBudgetView';
import { TransactionsProp } from '../../props/YourExpensesProps';

const TransactionTable = () => {
    const [transactionId, setTransactionId] = useState("");
    const [description, setDescription] = useState("");
    const [ previousAmount, setPreviousAmount ] = useState<number>(0);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const { auth } = useAuth() as AuthProp;
    const { transactions, totalFunds, setTransactions, setTotalFunds } = useContext<YourBudget_ContextProp>(YourBudget_Context);

    const toggleEditModal = (paramTransactionId: string, paramTransactionDescription: string, paramTransactionAmount: number, paramTransactionDate: string) => {
        setPreviousAmount(paramTransactionAmount);

        setTransactionId(paramTransactionId);
        setDescription(paramTransactionDescription);
        setAmount(paramTransactionAmount);
        setDate(paramTransactionDate);
        setModalVisible(true);
    }

    const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(e.target.value));
    }

    const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value + "T00:00:00");
    }

    // Update the toal funds and transactions array based on the transaction being updated
    const updateTransactionById = (updatedTransaction: TransactionsProp) => {
        const transactionIndex = transactions.findIndex(transaction => transaction._id === updatedTransaction._id);

        if(transactionIndex !== -1) {
            const convertedUpdatedAmount = Number(updatedTransaction.amount.$numberDecimal.replace(/[$,]/g, ''));
            const convertedTotalFunds = Number(totalFunds.replace(/[$,]/g, ''));
            const tempTotalFunds = convertedTotalFunds - previousAmount;

            setTotalFunds(formatCurrency(tempTotalFunds + convertedUpdatedAmount));
            setPreviousAmount(convertedUpdatedAmount);

            const updatedTransactions = [...transactions];

            updatedTransactions[transactionIndex].description = description;
            updatedTransactions[transactionIndex].date = date;
            updatedTransactions[transactionIndex].amount = { $numberDecimal: amount.toString() };

            setTransactions(updatedTransactions);
        }
    }

    // Update the total funds and transactions array based on the transaction being deleted
    const deleteTransactionById = (deletedTransaction: TransactionsProp) => {
        const transactionIndex = transactions.findIndex(transaction => transaction._id === deletedTransaction._id);

        if(transactionIndex !== -1) {
            const convertedTotalFunds = Number(totalFunds.replace(/[$,]/g, ''));
            const tempTotalFunds = convertedTotalFunds - previousAmount;

            setTotalFunds(formatCurrency(tempTotalFunds));

            const updatedTransactions = [...transactions];
            updatedTransactions.splice(transactionIndex, 1);

            setTransactions(updatedTransactions);
        }
    }

    const onClickSubmit = async () => {
        
        const updatedTransaction = await updateTransaction(auth.accessToken, transactionId, description, amount, date, setErrorMessage) as TransactionsProp;
        
        if (updatedTransaction) {
            updateTransactionById(updatedTransaction);
        }
        setAmount(0);
        setDescription("");
        setDate("");
        setModalVisible(false);
    }

    const onClickDelete = async () => {
        const deletedTransaction = await deleteTransaction(auth.accessToken, transactionId, setErrorMessage);

        if (deletedTransaction) {
            deleteTransactionById(deletedTransaction)
        }
        setAmount(0);
        setDescription("");
        setDate("");
        setModalVisible(false);
    }

    const onClose = () => {
        setModalVisible(false);
    }
    return (
        <div>
            <table className="border-collapse border border-slate-500 ml-5 text-black">
                <thead>
                    <tr>
                        <th className="border border-slate-600 p-2 text-bold text-lg">Transaction Description</th>
                        <th className="border border-slate-600 p-2 text-bold text-lg">Transaction Amount</th>
                        <th className="border border-slate-600 p-2 text-bold text-lg">Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction) => {
                            const transactionId = transaction._id;
                            const description = transaction.description;
                            const date = new Date(transaction.date);
                            const formattedDate = date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                            const functionDate = date.toISOString().slice(0, 10);
                            const amount = parseFloat(transaction.amount.$numberDecimal.toString());
                            const formattedAmount = formatCurrency(amount);
                            return(
                                <tr key={uuidv4()} className="border border-slate-600">
                                    <td className="border border-slate-600 px-2 text-bold text-md">
                                        <a href="#" onClick={() => toggleEditModal(transactionId, description, amount, functionDate)}>
                                            {transaction.description}
                                        </a>
                                    </td>
                                    <td className="border border-slate-600 px-2 text-bold text-md">{formattedAmount}</td>
                                    <td className="border border-slate-600 px-2 text-bold text-md">{formattedDate}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            
            <input 
                type="checkbox"
                id= "editTransaction"
                className= "modal-toggle"
                readOnly
                checked={modalVisible} />

            <EditTransactionModal 
                modalVisible={modalVisible}
                id={transactionId}
                description={description}
                amount={amount}
                date={date}
                updateDescription={updateDescription}
                updateAmount={updateAmount}
                updateDate={updateDate}
                onClickSubmit={onClickSubmit}
                onClickDelete={onClickDelete}
                onClickClose={onClose}
                />
        </div>
    );
}

export default TransactionTable;