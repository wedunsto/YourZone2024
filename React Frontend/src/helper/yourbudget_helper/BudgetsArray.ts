import axios from "../../api/axios"

interface MongoDecimal {
    $numberDecimal: string;
}

interface BudgetsProp {
    description: string,
    amount: MongoDecimal,
    amountPerCheck: MongoDecimal,
    category: string,
    dateSubmitted: string,
    futureDate: string
}

export const getBudgetsArray = async (authID: string, authAccessToken: string) => {
    const GET_BUDGETS_URL = `/yourBudget/budgets?userId=${authID}`;
    try {
        const response = await axios.get(GET_BUDGETS_URL,
            {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authAccessToken}`},
                    withCredentials: true
            });
        const budgetsArray: Array<BudgetsProp> = response?.data;
        return budgetsArray;
    } catch(err) {
       console.log(`${err}`);
       return [];
    }
}