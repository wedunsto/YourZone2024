// DELETE operation to delete existing transaction in the database

import axios from "../../api/axios";
import { TransactionsProp } from "../../props/YourExpensesProps";

export const deleteTransaction = async (authToken: string, transactionId: string,
    setErrorMessage: (error: string)=> void) => {
        const DELETE_TRANSACTION_URL = `yourBudget/transactions?transactionId=${transactionId}`;

        try {
            const response = await axios.delete(DELETE_TRANSACTION_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });

            const deletedTransaction: TransactionsProp = response?.data;

            return deletedTransaction;
        } catch(err) {
            setErrorMessage(`${err}`);
        }
}