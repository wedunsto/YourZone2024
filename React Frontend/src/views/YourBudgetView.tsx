// View for all current expenses, and buttons to add, edit, and delete expenses
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import "../styles/YourExpensesStyles.css"; 
import { AuthProp } from "../props/CommonProps";
import ButtonMenu from "../components/yourbudget_components/buttons/ButtonMenu";
import AddTransactionButton from "../components/yourbudget_components/buttons/AddTransactionButton";
import InitialBalanceModal from "../components/yourbudget_components/modals/InitialBalanceModal";
import { getTransactionsArray } from "../helper/yourbudget_helper/TransactionsArray";
import { getTotalFunds } from "../helper/yourbudget_helper/TotalFunds";
import BudgetTable from "../components/yourbudget_components/BudgetTable";
import { getBudgetsArray } from "../helper/yourbudget_helper/BudgetsArray";
import { getTotalBudgetsCosts } from "../helper/yourbudget_helper/TotalBudgetsCost";
import AddBudgetButton from "../components/yourbudget_components/buttons/AddBudgetButton";
import TransactionTable from '../components/yourbudget_components/TransactionTable';

interface MongoDecimal {
    $numberDecimal: string;
}

interface TransactionsProp {
    description: string,
    amount: MongoDecimal,
    category: string,
    date: string
}

interface BudgetsProp {
    description: string,
    amount: MongoDecimal,
    amountPerCheck: MongoDecimal,
    category: string,
    dateSubmitted: string,
    futureDate: string
}

const YourExpensesView = () => {
    const { auth } = useAuth() as AuthProp;
    
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ transactions, setTransactions ] = useState(Array<TransactionsProp>);
    const [ totalFunds, setTotalFunds ] = useState<string>("");

    const [ budgets, setBudgets ] = useState(Array<BudgetsProp>);
    const [ totalBudgetCost, setTotalBudgetCost ] = useState<number>(0);
    
    const [ submitted, setSubmitted ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        const getTransactions = async () => {
            const transactionsArray = await getTransactionsArray(auth.id, auth.accessToken);
            if(transactionsArray.length === 0) {
                setModalVisible(true);
            }
            setTransactions(transactionsArray);
            setTotalFunds(getTotalFunds(transactionsArray));
        }
        
        const getBudgets = async () => {
            const budgetsArray = await getBudgetsArray(auth.id, auth.accessToken);
            setBudgets(budgetsArray);
            setTotalBudgetCost(getTotalBudgetsCosts(budgetsArray));
        }

        getTransactions();
        getBudgets();
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
                    <p className="text-7xl text-black font-bold">{totalFunds}</p>
                    <div className="m-5 flex flex-row space-x-5">
                        <AddTransactionButton
                            rerender={rerender}
                            income={true} />
                        <AddTransactionButton
                            rerender={rerender}
                            income={false} />
                        <div className="flex grow justify-end">
                            <AddBudgetButton
                                rerender={rerender} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 items-start">
                        <TransactionTable transactionsArray={transactions} />
                        <BudgetTable budgetsArray={budgets} />
                    </div>
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