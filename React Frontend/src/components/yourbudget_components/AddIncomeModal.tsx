import { useState, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { TotalFundsContext } from '../../views/YourExpensesView';
import axios from '../../api/axios';

interface AddIncomeModalProp {
    modalVisible: boolean
    onClickClose: (() => void)
}

const AddIncomeModal = ( { modalVisible, onClickClose }: AddIncomeModalProp ) => {
    const { auth } = useAuth() as AuthProp;
    const GET_EXPENSES_URL = `/getExpenses?userId=${auth.id}`;
    const CREATE_EXPENSE_URL = '/createExpense';
    const totalFunds = useContext(TotalFundsContext);
    
    const [ income, setIncome ] = useState<number>(0);
    const [ incomeName, setIncomeName] = useState<string>("");
    const [ incomeDate, setIncomeDate ] = useState<Date>(new Date());
    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateIncome = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const numIncome:number = +e.target.value;
        setIncome(numIncome);
    }

    const updateIncomeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncomeDate(new Date(Date.parse(e.target.value + "T00:00:00")));
    };

    const createIncome = async (e: any) => {
        e.preventDefault();
        console.log(totalFunds);
        /*const dbTotalFunds = totalFunds + income;
        
        if(!(incomeName === '') && !(income === 0)) {
            try {
                await axios.post(CREATE_EXPENSE_URL,
                    JSON.stringify({"userId": auth.id, "totalfunds": dbTotalFunds,
                         "transactionname": incomeName, "transactionamount": income,
                         "transactiondate": incomeDate}),
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
        onClickClose();*/
    }

    return(
        <div className={`modal ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-box">
                <form className="flex flex-col rounded-lg">
                    <div>
                        <p className="text-2xl">Enter Income</p>
                    </div>
                </form>
                <div className="flex justify-between">
                    <button className="btn mt-2 text-lg text-white" onClick={onClickClose}>Close</button>
                    <button className="btn mt-2 text-lg text-white" onClick={createIncome}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default AddIncomeModal;