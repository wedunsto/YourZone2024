// DELETE operation to delete existing transaction in the database

import axios from "../../api/axios";

export const deleteTransaction = async (authToken: string, transactionId: string,
    setErrorMessage: (error: string)=> void) => {
        const DELETE_TRANSACTION_URL = `yourBudget/transactions?transactionId=${transactionId}`;

        try {
            await axios.delete(DELETE_TRANSACTION_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
        } catch(err) {
            setErrorMessage(`${err}`);
        }
}