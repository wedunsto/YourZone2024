import { useContext, useState } from 'react';
import AddIncomeModal from './AddIncomeModal';
import useAuth from '../../hooks/useAuth';
import { TotalFundsContext } from '../../views/YourExpensesView'
import axios from '../../api/axios';

interface AddIncomeButtonProp {
    rerender: (() => void)
}

const AddIncomeButton = ({rerender}:AddIncomeButtonProp) => {
    const [ modalVisible, setModalVisible] = useState<boolean>(false);
    const [ income, setIncome ] = useState<number>(0);
    const [ incomeName, setIncomeName] = useState<string>("");
    const [ incomeDate, setIncomeDate ] = useState<Date>(new Date());
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { auth } = useAuth() as AuthProp;
    const CREATE_EXPENSE_URL = '/createExpense';
    const totalFunds = useContext(TotalFundsContext);

    const onClickAddIncome = () => {
        setModalVisible(true);
    }

    const updateIncomeName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setIncomeName(e.target.value);
    }

    const updateIncome = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const numIncome:number = +e.target.value;
        setIncome(numIncome);
    }

    const updateIncomeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncomeDate(new Date(Date.parse(e.target.value + "T00:00:00")));
    };

    const onClickSubmit = () => {
        rerender();
        setIncome(0);
        setIncomeName("");
        setIncomeDate(new Date());
        setModalVisible(false);
    }

    const onClickClose = () => {
        setModalVisible(false);
    }

    const createIncome = async (e: any) => {
        e.preventDefault();
        const numTotalFunds: number = +totalFunds;
        const dbTotalFunds = numTotalFunds + income;
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
                setErrorMessage("An error occurred");
            }
        } else {
            setErrorMessage('Ensure all fields are filled out.');
        }
        onClickSubmit();
    }

    return(
        <div>
            { errorMessage != "" ? <p>{errorMessage}</p> : null}
            <label 
            className= "btn m-5 text-white text-lg"
            onClick={onClickAddIncome}
            htmlFor="createIncome">Add Income</label>

            <input
                type="checkbox"
                id="createIncome"
                className="modal-toggle"
                readOnly
                checked={modalVisible} />
            <AddIncomeModal
                incomeName={incomeName}
                income={income}
                modalVisible={modalVisible}
                updateIncomeName={updateIncomeName}
                updateIncome={updateIncome}
                updateIncomeDate={updateIncomeDate}
                onClickSubmit={createIncome}
                onClickClose={onClickClose}/>
        </div>
    );
}

export default AddIncomeButton;