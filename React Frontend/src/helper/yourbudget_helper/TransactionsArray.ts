import axios from "../../api/axios";
import { TransactionsProp } from "../../props/YourExpensesProps";

// Get all transactions for a user based on their user Id
export const getTransactionsArray = async (userId: string, accessToken: string) => {
    
    const GET_TRANSACTIONS_URL = `/yourBudget/transactions?userId=${userId}`;
    
    try {
        const response = await axios.get(GET_TRANSACTIONS_URL,
        {
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`},
                    withCredentials: true
        });

        const transactionsArray: Array<TransactionsProp> = response?.data;
        return transactionsArray;
    } catch(err) {
        console.log(`${err}`);
        return [];
    }
}