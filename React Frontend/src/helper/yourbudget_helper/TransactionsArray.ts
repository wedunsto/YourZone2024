import axios from "../../api/axios";
interface MongoDecimal {
    $numberDecimal: string;
}

interface TransactionsProp {
    _id: string,
    description: string,
    amount: MongoDecimal,
    category: string,
    date: string
}

export const getTransactionsArray = async (authId: string, authAccessToken: string) => {
    const GET_TRANSACTIONS_URL = `/yourBudget/transactions?userId=${authId}`;
    
    try {
        const response = await axios.get(GET_TRANSACTIONS_URL,
        {
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authAccessToken}`},
                    withCredentials: true
        });
        const transactionsArray: Array<TransactionsProp> = response?.data;
        return transactionsArray;
    } catch(err) {
        console.log(`${err}`);
        return [];
    }
}