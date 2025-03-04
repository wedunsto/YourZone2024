// DELETE operation to delete existing transaction in the database

import axios from "../../api/axios";
import { BudgetsProp } from "../../props/YourExpensesProps";

export const deleteBudget = async (authToken: string, budgetId: string,
    setErrorMessage: (error: string)=> void) => {
        const DELETE_BUDGET_URL = `yourBudget/budgets?budgetId=${budgetId}`;

        try {
            const response = await axios.delete(DELETE_BUDGET_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });

            const deletedbudget: BudgetsProp = response?.data;

            return deletedbudget;
        } catch(err) {
            setErrorMessage(`${err}`);
        }
}