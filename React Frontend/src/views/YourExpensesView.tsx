// View for all current expenses, and buttons to add, edit, and delete expenses
import axios from "../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
// import { v4 as uuidv4 } from 'uuid';
import Header from "../components/Header";
import "../styles/YourExpensesStyles.css";
import YourBudgetModal from "../components/yourbudget_components/AddExpensesModal";

interface MongoDecimal {
    $numberDecimal: string;
}

interface ExpenseProp {
    totalfunds: MongoDecimal,
    transactionname: string,
    transactionamount: MongoDecimal,
    transactiondate: string
    userId: string
}

const YourExpensesView = () => {
    const { auth } = useAuth() as AuthProp;
    const GET_EXPENSES_URL = `/getExpenses?userId=${auth.id}`;
    const CREATE_EXPENSE_URL = '/createExpense';

    const [modalVisible, setModalVisible] = useState(false);
    const [expenses, setExpenses] = useState(Array<ExpenseProp>);
    const [totalFunds, setTotalFunds] = useState("");
    const [expenseName, setExpenseName] = useState("");
    const [expenseCost, setExpenseCost] = useState<number>(0);
    const [expenseDate, setExpenseDate] = useState<Date>(new Date())
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const response = await axios.get(GET_EXPENSES_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                    if(response?.data?.length === 0) {
                        setModalVisible(true);
                    } else {
                        setExpenses(response?.data);
                        const mongoTotalFunds: MongoDecimal = response?.data[response?.data.length-1].totalfunds;
                        const stringTotalFunds: string = mongoTotalFunds.$numberDecimal;
                        const numberTotalFunds: number =+stringTotalFunds;
                        setTotalFunds(numberTotalFunds.toFixed(2));   
                    }
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        }

        getExpenses();
    }, [submitted]);
    
    const onClickCreate = () => {
        setModalVisible(true);
    }

    const onClickClose = () => {
        setModalVisible(false);
        setExpenseName("");
        setExpenseCost(0);
    }

    const updateExpenseName =(e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseName(e.target.value);
    }

    const updateExpenseCost =(e: React.ChangeEvent<HTMLInputElement>) => {
        const temp: number = +e.target.value;
        setExpenseCost(temp);
    }

    const updateExpenseDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseDate(new Date(Date.parse(e.target.value + "T00:00:00")));
    };
    

    const createExpense = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const numberTotalFunds: number = +totalFunds;
        let dbTotalFunds = numberTotalFunds - expenseCost;
        let expensename = expenseName;

        if(expenses.length === 0) {
            expensename = "Initial funds";
            dbTotalFunds = expenseCost;
        } 
        if(!(expensename === '') && !(expenseCost === 0)) {
            try {
                await axios.post(CREATE_EXPENSE_URL,
                    JSON.stringify({"userId": auth.id, "totalfunds": dbTotalFunds,
                         "transactionname": expensename, "transactionamount": expenseCost,
                         "transactiondate": expenseDate}),
                         {
                            headers: { 
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${auth.accessToken}`},
                                withCredentials: true
                         }
                );
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        } else {
            setErrorMessage('Ensure all fields are filled out.');
        }
        setSubmitted(!submitted)
        setExpenseCost(0);
        setExpenseName("");
        setExpenseDate(new Date());
        setModalVisible(false);
    }

    return(
        <div className="your-expenses-page-background h-screen w-screen">
            <div className="grow flex justify-center">
                <Header textColor="text-black" title="YourBudget" subTitle="Master Your Finances, Achieve Your Goals" />
            </div>
            {errorMessage === ""? <p>{errorMessage}</p> : null}
            <div>
                <p className="ml-5 text-7xl text-black font-bold">${totalFunds}</p>                
                <label
                    className="btn m-5 text-white text-lg"
                    onClick={onClickCreate}
                    htmlFor="createExpense">Create Expense</label>
                <input
                    type="checkbox"
                    id="createExpense"
                    className="modal-toggle"
                    readOnly
                    checked={modalVisible} />
                
                <YourBudgetModal 
                    modalVisible={false}
                    expenseId={""}
                    expenseName={expenseName}
                    expenseCost={expenseCost}
                    expenseDate={expenseDate}
                    updateExpenseName={updateExpenseName} 
                    updateExpenseCost={updateExpenseCost}
                    updateExpenseDate={updateExpenseDate}
                    onClickSubmit={createExpense}
                    onClickClose={onClickClose}
                    expensesLength={expenses.length}
                />
            </div>
            <table className="border-collapse border border-slate-500 ml-5 text-black">
                <tr>
                    <th className="border border-slate-600 p-2 text-bold text-lg">Expense Name</th>
                    <th className="border border-slate-600 p-2 text-bold text-lg">Expense Amount</th>
                    <th className="border border-slate-600 p-2 text-bold text-lg">Expense Date</th>
                </tr>
                {
                    expenses.map((expense) => {
                        const mongoObject: MongoDecimal = expense.transactionamount;
                        const decimalValue: string = mongoObject.$numberDecimal;
                        const date = new Date(expense.transactiondate);
                        const formattedDate = date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                        return(
                            <tr className="border border-slate-600">
                                <td className="border border-slate-600 px-2 text-bold text-md">{expense.transactionname}</td>
                                <td className="border border-slate-600 px-2 text-bold text-md">${decimalValue}</td>
                                <td className="border border-slate-600 px-2 text-bold text-md">{formattedDate}</td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    );
}

export default YourExpensesView;