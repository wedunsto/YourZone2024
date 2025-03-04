// Table of YourBudget Budgets

import { useContext, useState } from "react";
import { formatCurrency } from "../../helper/yourbudget_helper/FormatCurrency";
import useAuth from "../../hooks/useAuth";
import { AuthProp } from "../../props/CommonProps";
import "../../styles/YourExpensesStyles.css";
import { v4 as uuidv4 } from 'uuid';
import { YourBudget_Context, YourBudget_ContextProp } from "../../views/YourBudgetView";
import { BudgetsProp } from "../../props/YourExpensesProps";
import { updateBudget } from "../../helper/yourbudget_helper/EditBudget";
import { deleteBudget } from "../../helper/yourbudget_helper/DeleteBudget";
import EditBudgetModal from "./modals/EditBudgetModal";

const BudgetTable = () => {
    const { auth }: AuthProp = useAuth();
    const { transactions, budgets, totalFunds, setTransactions, setBudgets, setTotalFunds } = useContext<YourBudget_ContextProp>(YourBudget_Context);
    
    const [budgetId, setBudgetId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [previousAmount, setPreviousAmount] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [amountPP, setAmountPP] = useState<number>(0);
    const [subDate, setSubDate] = useState<string>("");
    const [futDate, setFutDate] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    const toggleEditModal = (paramBudgetId: string, parambudgetDescription: string, paramBudgetAmount: number, paramBudgetAPP: number, paramBudgetSubDate: string, paramBudgetFutDate: string) => {
        setPreviousAmount(paramBudgetAmount);

        setBudgetId(paramBudgetId);
        setDescription(parambudgetDescription);
        setAmount(paramBudgetAmount);

        if(paramBudgetAPP > 0) {
            setAmountPP(paramBudgetAPP);
        }

        setSubDate(paramBudgetSubDate);
        setFutDate(paramBudgetFutDate);
        setModalVisible(true);
    }

    const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(e.target.value));
    }

    const updateAmountPP = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountPP(parseFloat(e.target.value));
    }

    const updateSubDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubDate(e.target.value + "T00:00:00");
    }

    const updateFutDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFutDate(e.target.value + "T00:00:00");
    }

    // Update the budgets array based on the budget being updated
    const updateBudgetById = (updatedBudget: BudgetsProp) => {
        const budgetIndex = budgets.findIndex(budget => budget._id === updatedBudget._id);

        if (budgetIndex !== -1) {
            const updatedBudgets = [...budgets];

            updatedBudgets[budgetIndex].description = description;
            updatedBudgets[budgetIndex].amount = { $numberDecimal: amount.toString()};
            updatedBudgets[budgetIndex].dateSubmitted = subDate;
            updatedBudgets[budgetIndex].futureDate = futDate;
            updatedBudgets[budgetIndex].amountPerCheck = { $numberDecimal: amountPP.toString()};

            setBudgets(updatedBudgets);
        }
    }

    // Update budgets array based on the budget being deleted
    const deleteBudgetById = (deletedBudget: BudgetsProp) => {
        const budgetIndex = budgets.findIndex(budget => budget._id === deletedBudget._id);

        if (budgetIndex !== -1) {
            const updatedBudgets = [...budgets];
            updatedBudgets.splice(budgetIndex, 1);

            setBudgets(updatedBudgets);
        }
    }

    const onClickSubmit = async () => {
        const updatedBudget = await updateBudget(auth.accessToken, budgetId, description, amount, amountPP, subDate, futDate, setErrorMessage);

        if (updatedBudget) {
            updateBudgetById(updatedBudget);
        }
        
        setDescription("");
        setAmount(0);
        setAmountPP(0);
        setSubDate("");
        setFutDate("");

        setModalVisible(false)
    }

    const onClickDelete = async () => {
        const updatedBudget = await deleteBudget(auth.accessToken, budgetId, setErrorMessage);

        if (updatedBudget) {
            updateBudgetById(updatedBudget);
        }
        
        setDescription("");
        setAmount(0);
        setAmountPP(0);
        setSubDate("");
        setFutDate("");

        setModalVisible(false);
    }

    const onClose = () => {
        setModalVisible(false);
    }

    return(
        <div>
            <table className="budget-table border-collapse border border-slate-500 ml-5 text-black">
                <thead>
                    <tr>
                        <th className="border border-slate-600 p-2 text-bold text-lg">Budget Description</th>
                        <th className="border border-slate-600 p-2 text-bold text-lg">Budget Amount</th>
                        <th className="border border-slate-600 p-2 text-bold text-lg">Budget Amount Per Paycheck</th>
                        <th className="border border-slate-600 p-2 text-bold text-lg">Budget Submitted Date</th>
                        <th className="border border-slate-600 p-2 text-bold text-lg">Budget Future Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        budgets.map((budget) => {
                            const budgetId = budget._id;
                            const description = budget.description;
                            const submittedDate = new Date(budget.dateSubmitted);
                            const futureDate = new Date(budget.futureDate);
                            const functionSubmittedDate = submittedDate.toISOString().slice(0, 10);
                            const functionFutureDate = futureDate.toISOString().slice(0, 10);
                            const formattedSubmittedDate = submittedDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                            const formattedFutureDate = futureDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                            const amount = parseFloat(budget.amount.$numberDecimal.toString());
                            const amountPerPaycheck = parseFloat(budget.amountPerCheck.$numberDecimal.toString());
                            const formattedAmount = formatCurrency(amount);
                            const formattedAmountPerPaycheck = formatCurrency(amountPerPaycheck);
                            return(
                                <tr key={uuidv4()} className="border border-slate-600">
                                    <td className="border border-slate-600 px-2 text-bold text-md">
                                        <a href="#" onClick={() => toggleEditModal(budgetId, description, amount, amountPerPaycheck, functionSubmittedDate, functionFutureDate)}>
                                            {budget.description}
                                        </a>
                                    </td>
                                    <td className="border border-slate-600 px-2 text-bold text-md">{formattedAmount}</td>
                                    <td className="border border-slate-600 px-2 text-bold text-md">{formattedAmountPerPaycheck}</td>
                                    <td className="border border-slate-600 px-2 text-bold text-md">{formattedSubmittedDate}</td>
                                    <td className="border border-slate-600 px-2 text-bold text-md">{formattedFutureDate}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <input 
                type="checkbox"
                id= "editBudget"
                className= "modal-toggle"
                readOnly
                checked={modalVisible} />

            <EditBudgetModal
                modalVisible={modalVisible}
                id={budgetId}
                description={description}
                amount={amount}
                amountPP={amountPP}
                subDate={subDate}
                futDate={futDate}
                updateDescription={updateDescription}
                updateAmount={updateAmount}
                updateAmountPP={updateAmountPP}
                updateSubDate={updateSubDate}
                updateFutDate={updateFutDate} 
                onClickSubmit={onClickSubmit}
                onClickDelete={onClickDelete}
                onClickClose={onClose} />
        </div>
    );
}

export default BudgetTable;