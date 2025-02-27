import { TransactionsProp } from "../../props/YourExpensesProps";
import { formatCurrency } from "./FormatCurrency";

export const getTotalFunds = (transactionsArray: Array<TransactionsProp>) => {
    let totalFunds = 0;
    for(let i=0; i<transactionsArray.length; i++) {
        totalFunds += parseFloat(transactionsArray[i].amount.$numberDecimal.toString());
    }

    return formatCurrency(totalFunds);
}