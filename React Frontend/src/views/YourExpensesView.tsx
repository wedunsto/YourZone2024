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

const YourExpensesView = () => {
    const { auth } = useAuth() as AuthProp;
    const GET_EXPENSES_URL = `/getExpenses?userId=${auth.id}`;
    const CREATE_EXPENSE_URL = '/createExpense';

    const [modalVisible, setModalVisible] = useState(false);
    const [expenses, setExpenses] = useState(Array<ExpenseProp>);
    const [expenseName, setExpenseName] = useState("");
    const [expenseCost, setExpenseCost] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
                    setExpenses(response?.data);
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

    const createExpense = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(!(expenseName === '') && !(expenseCost === 0)) {
            try {
                await axios.post(CREATE_EXPENSE_URL,
                    JSON.stringify({"userId": auth.id, "totalfunds": 5,
                         "transactionname": expenseName, "transactionamount": expenseCost}),
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
        setSubmitted(!submitted);
        setModalVisible(false);
    }

    return(
        <div className="your-expenses-page-background h-screen w-screen">
            <div className="grow flex justify-center">
                <Header textColor="text-black" title="YourBudget" subTitle="Master Your Finances, Achieve Your Goals" />
            </div>
            <div>
                <label
                    className="btn m-5"
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
                    updateExpenseName={updateExpenseName} 
                    updateExpenseCost={updateExpenseCost}
                    onClickClose={onClickClose}
                    createExpense={createExpense}
                />
            </div>
            <table className="border-collapse border border-slate-500">
                <tr>
                    <th className="border border-slate-600">Expense Name</th>
                    <th className="border border-slate-600">Expense Amount</th>
                    <th className="border border-slate-600">Expense Date</th>
                </tr>
                {
                    expenses.map((expense) => {
                        console.log(expenses)
                        const mongoObject: MongoDecimal = expense.transactionamount;
                        const decimalValue: string = mongoObject.$numberDecimal;
                        const date = new Date(expense.transactiondate);
                        const formattedDate = date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',}); 
                        return(
                            <tr className="border border-slate-600">
                                <td className="border border-slate-600">{expense.transactionname}</td>
                                <td className="border border-slate-600">${decimalValue}</td>
                                <td className="border border-slate-600">{formattedDate}</td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    );
}

export default YourExpensesView;