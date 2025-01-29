// Table of transactions for the logged in user
import {react, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from '../../helper/yourbudget_helper/FormatCurrency';

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
    const [modalVisible, setModalVisible] = useState(false);

    const toggleEditModal = () => {
        setModalVisible(true);
    }

    return (
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
                        const date = new Date(transaction.date);
                        const formattedDate = date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                        const amount = parseFloat(transaction.amount.$numberDecimal.toString());
                        const formattedAmount = formatCurrency(amount);
                        return(
                            <tr key={uuidv4()} className="border border-slate-600">
                                <td className="border border-slate-600 px-2 text-bold text-md"><a href="#" onClick={toggleEditModal}>{transaction.description}</a></td>
                                <td className="border border-slate-600 px-2 text-bold text-md">{formattedAmount}</td>
                                <td className="border border-slate-600 px-2 text-bold text-md">{formattedDate}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export default TransactionTable;