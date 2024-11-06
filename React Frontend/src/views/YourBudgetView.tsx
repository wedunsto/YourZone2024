// View for all current expenses, and buttons to add, edit, and delete expenses
import axios from "../api/axios";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import "../styles/YourExpensesStyles.css"; 
import { AuthProp } from "../props/CommonProps";
import ButtonMenu from "../components/yourbudget_components/buttons/ButtonMenu";
import AddTransactionButton from "../components/yourbudget_components/buttons/AddTransactionButton";
import InitialBalanceModal from "../components/yourbudget_components/modals/InitialBalanceModal";

interface MongoDecimal {
    $numberDecimal: string;
}

interface TransactionsProp {
    description: string,
    amount: MongoDecimal,
    date: string
}

const YourExpensesView = () => {
    const { auth } = useAuth() as AuthProp;
    const GET_TRANSACTIONS_URL = `/yourBudget/transactions?userId=${auth.id}`;
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ transactions, setTransactions ] = useState(Array<TransactionsProp>);
    const [ totalFunds, setTotalFunds ] = useState<number>(0);
    const [ submitted, setSubmitted ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        const calculateTotalFunds = (transactions: Array<TransactionsProp>) => {
            let tempTotalFunds = 0;
            for(let i=0; i<transactions.length; i++) {
                tempTotalFunds += parseFloat(transactions[i].amount.$numberDecimal.toString());
            }
            setTotalFunds(tempTotalFunds);
        };

        const getTransactions = async () => {
            try {
                const response = await axios.get(GET_TRANSACTIONS_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                    if(response?.data?.length === 0) {
                        setModalVisible(true);
                    } else {
                        setTransactions(response?.data);
                        calculateTotalFunds(response?.data);
                    }
            } catch(err) {
                setErrorMessage(`${err}`);
            }
        }

        getTransactions();
    }, [submitted]);

    const rerender = () => {
        setModalVisible(false);
        setSubmitted(!submitted);
    }

    return(
        <div className="your-expenses-page-background h-screen w-screen">
            <div className="grow flex justify-center">
                <Header textColor="text-black" title="YourBudget" subTitle="Master Your Finances, Achieve Your Goals" />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="flex flex-row">
                <ButtonMenu />
                <div className="ml-5 flex flex-col">
                    <p className="text-7xl text-black font-bold">${totalFunds}</p>
                    <div className="m-5 flex flex-row space-x-5">
                        <AddTransactionButton
                            rerender={rerender}
                            income={true} />
                        <AddTransactionButton
                            rerender={rerender}
                            income={false} />
                    </div>
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
                </div>
            </div>
            <input
                type="checkbox"
                id="createInitialTransaction"
                className="modal-toggle"
                readOnly
                checked={modalVisible} /> 
            <InitialBalanceModal 
                modalVisible={modalVisible}
                rerender={rerender}
                setErrorMessage={setErrorMessage} />               
        </div>
    );
}

export default YourExpensesView;