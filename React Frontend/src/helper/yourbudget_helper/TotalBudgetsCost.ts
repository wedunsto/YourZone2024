interface MongoDecimal {
    $numberDecimal: string;
}

interface BudgetsProp {
    description: string,
    amount: MongoDecimal,
    amountPerCheck: MongoDecimal,
    dateSubmitted: string,
    futureDate: string
}

export const getTotalBudgetsCosts = (budgetsArray: Array<BudgetsProp>) => {
    let totalCost = 0;

    for(let i=0; i<budgetsArray.length; i++) {
        totalCost += parseFloat(budgetsArray[i].amount.$numberDecimal.toString());
    }
    return totalCost;
}