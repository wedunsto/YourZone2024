export interface MongoDecimal {
    $numberDecimal: string;
}

export interface TransactionsProp {
    description: string,
    amount: MongoDecimal,
    category: string,
    date: string
}

export interface BudgetsProp {
    description: string,
    amount: MongoDecimal,
    amountPerCheck: MongoDecimal,
    category: string,
    dateSubmitted: string,
    futureDate: string
}