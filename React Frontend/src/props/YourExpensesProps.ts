export interface MongoDecimal {
    $numberDecimal: string;
}

export interface TransactionsProp {
    _id: string,
    description: string,
    amount: MongoDecimal,
    category: string,
    date: string
}

export interface BudgetsProp {
    _id: string,
    description: string,
    amount: MongoDecimal,
    amountPerCheck: MongoDecimal,
    category: string,
    dateSubmitted: string,
    futureDate: string
}