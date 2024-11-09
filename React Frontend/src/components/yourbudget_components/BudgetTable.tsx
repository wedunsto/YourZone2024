/* 
 * Table of YourBudget Budgets
 * Budgets include: description, amount, amountPerPaycheck,
 * dateSubmitted, futureDate
 */
import "../../styles/YourExpensesStyles.css";
import { v4 as uuidv4 } from 'uuid';

interface MongoDecimal {
    $numberDecimal: string;
}

interface BudgetsProp {
    description: string,
    amount: MongoDecimal,
    amountPerCheck: MongoDecimal,
    dateSubmitted: string,
    futureDate: string
}

interface BudgetTableProp {
    budgetsArray: Array<BudgetsProp>,
}

const BudgetTable = ({budgetsArray}: BudgetTableProp) => {
    return(
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
                    budgetsArray.map((budget) => {
                        const submittedDate = new Date(budget.dateSubmitted);
                        const futureDate = new Date(budget.futureDate);
                        const formattedSubmittedDate = submittedDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                        const formattedFutureDate = futureDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                        return(
                            <tr key={uuidv4()} className="border border-slate-600">
                                <td className="border border-slate-600 px-2 text-bold text-md">{budget.description}</td>
                                <td className="border border-slate-600 px-2 text-bold text-md">${budget.amount.$numberDecimal}</td>
                                <td className="border border-slate-600 px-2 text-bold text-md">${budget.amountPerCheck.$numberDecimal}</td>
                                <td className="border border-slate-600 px-2 text-bold text-md">{formattedSubmittedDate}</td>
                                <td className="border border-slate-600 px-2 text-bold text-md">{formattedFutureDate}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export default BudgetTable;