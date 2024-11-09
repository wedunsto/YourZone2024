import axios from "../../api/axios";

const CREATE_BUDGET_URL = '/yourbudget/budgets';

export const CreateBudget = async (userId: string, authToken: string, 
    description: string, amount: number, amountPerCheck: number, dateSubmitted: Date,
    futureDate:Date, setErrorMessage: (error: string) => void) => {
        try {
            axios.post(CREATE_BUDGET_URL,
                JSON.stringify({userId, description,
                    amount, amountPerCheck, dateSubmitted, futureDate}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true
                }
            )
        } catch (err) {
            setErrorMessage(`${err}`); 
        }
    }