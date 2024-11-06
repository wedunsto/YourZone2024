import axios from "../../api/axios";

const CREATE_TRANSACTION_URL = '/yourbudget/transactions';

export const createInitialBalance = async (userId: string, authToken: string,
    amount: number, date: Date, setErrorMessage: (error: string)=> void) => {
        try{
            await axios.post(CREATE_TRANSACTION_URL,
                JSON.stringify({ userId, description: "Initial Balance", 
                    amount, date}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    withCredentials: true
                }
            );
        }catch(err) {
            setErrorMessage(`${err}`);
        }
}

export default createInitialBalance;