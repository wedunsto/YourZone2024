import axios from "../../api/axios"
import { BudgetsProp } from "../../props/YourExpensesProps";

export const getBudgetsArray = async (userId:string, accessToken: string) => {
    const GET_BUDGETS_URL = `/yourBudget/budgets?userId=${userId}`;
    try {
        const response = await axios.get(GET_BUDGETS_URL,
            {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`},
                    withCredentials: true
            });
        const budgetsArray: Array<BudgetsProp> = response?.data;
        return budgetsArray;
    } catch(err) {
       console.log(`${err}`);
       return [];
    }
}