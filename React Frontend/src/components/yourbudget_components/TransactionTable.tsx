// Table of transactions for the logged in user
import { v4 as uuidv4 } from 'uuid';

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
                        return(
                            <tr key={uuidv4()} className="border border-slate-600">
                                <td className="border border-slate-600 px-2 text-bold text-md">{transaction.description}</td>
                                <td className="border border-slate-600 px-2 text-bold text-md">${transaction.amount.$numberDecimal}</td>
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