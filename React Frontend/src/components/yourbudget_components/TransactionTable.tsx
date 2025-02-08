// Table of transactions for the logged in user
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from '../../helper/yourbudget_helper/FormatCurrency';
import EditTransactionModal from './modals/EditTransactionModal';

interface MongoDecimal {
    $numberDecimal: string;
}

interface TransactionsProp {
    description: string,
    amount: MongoDecimal,
    category: string,
    date: string
}

interface TransactionsTableProp {
    transactionsArray: Array<TransactionsProp>,
}

const TransactionTable = ({ transactionsArray }: TransactionsTableProp) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const toggleEditModal = (paramDescription: string, paramAmount: number, paramDate: string) => {
        setDescription(paramDescription);
        setAmount(paramAmount);
        setDate(paramDate);
        setModalVisible(true);
    }

    const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }

    const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value + "T00:00:00");
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
                        transactionsArray.map((transaction) => {
                            const description = transaction.description;
                            const date = new Date(transaction.date);
                            const formattedDate = date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                            const functionDate = date.toISOString().slice(0, 10);
                            const amount = parseFloat(transaction.amount.$numberDecimal.toString());
                            const formattedAmount = formatCurrency(amount);
                            return(
                                <tr key={uuidv4()} className="border border-slate-600">
                                    <td className="border border-slate-600 px-2 text-bold text-md">
                                        <a href="#" onClick={() => toggleEditModal(description, amount, functionDate)}>
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
                description={description}
                amount={amount}
                date={date}
                updateDescription={updateDescription}
                updateAmount={updateAmount}
                onClickSubmit={function (e: any): void {
                    throw new Error('Function not implemented.');
                } } onClickClose={onClose}
                />
        </div>
    );
}

export default TransactionTable;