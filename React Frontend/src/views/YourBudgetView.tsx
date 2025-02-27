// View for all current expenses, and buttons to add, edit, and delete expenses
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/YourExpensesStyles.css"; 
import ButtonMenu from "../components/yourbudget_components/buttons/ButtonMenu";
import AddTransactionButton from "../components/yourbudget_components/buttons/AddTransactionButton";
import InitialBalanceModal from "../components/yourbudget_components/modals/InitialBalanceModal";
import { getTransactionsArray } from "../helper/yourbudget_helper/TransactionsArray";
import { getTotalFunds } from "../helper/yourbudget_helper/TotalFunds";
import BudgetTable from "../components/yourbudget_components/BudgetTable";
import { getBudgetsArray } from "../helper/yourbudget_helper/BudgetsArray";
import AddBudgetButton from "../components/yourbudget_components/buttons/AddBudgetButton";
import TransactionTable from '../components/yourbudget_components/TransactionTable';
import { TransactionsProp, BudgetsProp } from "../props/YourExpensesProps";
import useAuth from "../hooks/useAuth";
import { AuthProp } from "../props/CommonProps";


const YourExpensesView = () => {
    const { auth } = useAuth() as AuthProp;
    
    const [ initialBalanceModalVisible, setinitialBalanceModalVisible ] = useState<boolean>(false);
    const [ transactions, setTransactions ] = useState<Array<TransactionsProp>>([]);
    const [ budgets, setBudgets ] = useState<Array<BudgetsProp>>([]);
    const [ totalFunds, setTotalFunds ] = useState<string>("");
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        const getTransactions = async () => {
            const transactionsArray = await getTransactionsArray(auth.id, auth.accessToken);
            if(transactionsArray.length === 0) {
                setinitialBalanceModalVisible(true);
            }
            setTransactions(transactionsArray);
            setTotalFunds(getTotalFunds(transactionsArray));
        }
        
        const getBudgets = async () => {
            const budgetsArray = await getBudgetsArray(auth.id, auth.accessToken);
            setBudgets(budgetsArray);
        }

        getTransactions();
        getBudgets();
    }, []);

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
                            income={true} 
                            setTransactions={setTransactions}
                            setTotalFunds={setTotalFunds}
                        />
                        <AddTransactionButton
                            income={false}
                            setTransactions={setTransactions}
                            setTotalFunds={setTotalFunds}
                        />
                        <div className="flex grow justify-end">
                            <AddBudgetButton
                                budgets={budgets}
                                setBudgets={setBudgets}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 items-start">
                        <TransactionTable
                            transactionsArray={transactions} />
                        <BudgetTable budgetsArray={budgets} />
                    </div>
                </div>
            </div>
            <input
                type="checkbox"
                id="createInitialTransaction"
                className="modal-toggle"
                readOnly
                checked={initialBalanceModalVisible}
            /> 
            <InitialBalanceModal 
                modalVisible={initialBalanceModalVisible}
                setModalVisible={setinitialBalanceModalVisible}
                setErrorMessage={setErrorMessage}
                setTransactions={setTransactions}
                setTotalFunds={setTotalFunds}
            />               
        </div>
    );
}

export default YourExpensesView;