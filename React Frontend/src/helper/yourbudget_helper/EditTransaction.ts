// PUT operation to update existing transaction in the database

import axios from "../../api/axios";
import { TransactionsProp } from "../../props/YourExpensesProps";

export const updateTransaction = async (authToken: string, 
    transactionId: string, description: string, amount: number, date: string,
     setErrorMessage: (error: string)=> void) => {
        const UPDATE_TRANSACTION_URL = `yourBudget/transactions?transactionId=${transactionId}`;

        try{
            const response = await axios.put(UPDATE_TRANSACTION_URL,
                JSON.stringify({ description, amount, date}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true
                }
            );

            const updatedTransaction: TransactionsProp = response?.data;

            return updatedTransaction;
        }catch(err) {
            setErrorMessage(`${err}`);
        }
}