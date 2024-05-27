// View for all current expenses, and buttons to add, edit, and delete expenses
import axios from "../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';
import Header from "../components/Header";
import "../styles/YourExpensesStyles.css";

const YourExpensesView = () => {
    const { auth } = useAuth() as AuthProp;
    const EXPENSES_URL = `/getExpenses?userId=${auth.id}`;

    const [expense, setExpenses] = useState(Array<ExpenseProp>);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const response = await axios.get(EXPENSES_URL,
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.accessToken}`},
                            withCredentials: true
                    });
                    console.log(response.data);
                    setExpenses(response?.data);
            } catch(err) {
                setErrorMessage((err as ErrorProp).response);
            }
        }

        getExpenses();
    }, [submitted]);

    return(
        <div className="your-expenses-page-background h-screen w-screen">
            <div className="grow flex justify-center">
                <Header textColor="text-black" title="YourExpenses" subTitle="Master Your Finances, Achieve Your Goals" />
            </div>
        </div>
    );
}

export default YourExpensesView;