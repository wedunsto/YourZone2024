import axios from "../../api/axios";
import { TransactionsProp } from "../../props/YourExpensesProps";

const CREATE_TRANSACTION_URL = '/yourbudget/transactions';

export const createTransaction = async (userId: string, accessToken: string, description: string, 
    amount: number, date: Date, income: boolean, setErrorMessage: (error: string)=> void) => {

        try{
            const response = await axios.post(CREATE_TRANSACTION_URL,
                JSON.stringify({ userId, description, 
                    amount: income? amount : -amount, 
                    date}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredentials: true
                }
            );

            const newTransaction: TransactionsProp = response?.data;

            return newTransaction;
        }catch(err) {
            setErrorMessage(`${err}`);
        }
}