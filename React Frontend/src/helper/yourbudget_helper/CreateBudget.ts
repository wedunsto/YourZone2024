import axios from "../../api/axios";
import { BudgetsProp } from "../../props/YourExpensesProps";

const CREATE_BUDGET_URL = '/yourbudget/budgets';

export const CreateBudget = async (userId: string, authToken: string, 
    description: string, amount: number, amountPerCheck: number, dateSubmitted: Date,
    futureDate:Date, setErrorMessage: (error: string) => void): Promise<BudgetsProp | null> => {
        try {
            const response = await axios.post(CREATE_BUDGET_URL,
                JSON.stringify({userId, description,
                    amount, amountPerCheck, dateSubmitted, futureDate}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true
                }
            );
            return response.data as BudgetsProp;
        } catch (err) {
            setErrorMessage(`${err}`);
            return null; 
        }
    }