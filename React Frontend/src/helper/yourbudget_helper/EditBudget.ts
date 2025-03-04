// PUT operation to update existing transaction in the database

import axios from "../../api/axios";
import { BudgetsProp } from "../../props/YourExpensesProps";

export const updateBudget = async (authToken: string, 
    budgetId: string, description: string, amount: number, amountPP: number, subDate: string,
    futDate: string, setErrorMessage: (error: string)=> void) => {
        const UPDATE_BUDGET_URL = `yourBudget/budgets?budgetId=${budgetId}`;

        try{
            const response = await axios.put(UPDATE_BUDGET_URL,
                JSON.stringify({ description, amount, amountPP, dateSubmitted: subDate, futureDate: futDate}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true
                }
            );

            const updatedBudget: BudgetsProp = response?.data;

            return updatedBudget;
        }catch(err) {
            setErrorMessage(`${err}`);
        }
}