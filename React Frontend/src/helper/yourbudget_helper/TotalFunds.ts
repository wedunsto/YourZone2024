import { formatCurrency } from "./FormatCurrency";

interface MongoDecimal {
    $numberDecimal: string;
}

interface TransactionsProp {
    description: string,
    amount: MongoDecimal,
    category: string,
    date: string
}

export const getTotalFunds = (transactionsArray: Array<TransactionsProp>) => {
    let totalFunds = 0;
    for(let i=0; i<transactionsArray.length; i++) {
        totalFunds += parseFloat(transactionsArray[i].amount.$numberDecimal.toString());
    }

    return formatCurrency(totalFunds);
}