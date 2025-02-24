// Button used to open the modal to add a new Budget

import { useState } from "react";
import CreateBudgetModal from "../modals/CreateBudgetModal";
import { CreateBudget } from "../../../helper/yourbudget_helper/CreateBudget";
import { AuthProp } from '../../../props/CommonProps';
import useAuth from "../../../hooks/useAuth";
import { BudgetsProp } from "../../../props/YourExpensesProps";

interface AddBudgetButtonProp {
    budgets: Array<BudgetsProp>,
    setBudgets: React.Dispatch<React.SetStateAction<Array<BudgetsProp>>>
}

const AddBudgetButton = ({ budgets, setBudgets }: AddBudgetButtonProp) => {
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ description, setDescription ] = useState<string>("");
    const [ amount, setAmount ] = useState<number>(0);
    const [ amountPerCheck, setAmountPerCheck ] = useState<number>(0);
    const [ dateSubmitted, setDateSumbitted ] = useState<Date>(new Date());
    const [ futureDate, setFutureDate ] = useState<Date>(new Date());
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const { auth } = useAuth() as AuthProp;

    const onClickAddBudget = () => {
        setModalVisible(true);
    }

    const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }

    const updateAmountPerPayCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountPerCheck(Number(e.target.value));
    }

    const updateDateSubmitted = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateSumbitted(new Date(Date.parse(e.target.value + "T00:00:00")));
    }

    const updateFutureDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFutureDate(new Date(Date.parse(e.target.value + "T00:00:00")));
    }

    const onClickSubmit = async () => {
        const newBudget = await CreateBudget(auth.id, auth.accessToken, description, amount,
            amountPerCheck, dateSubmitted, futureDate, setErrorMessage
        );
        if (newBudget) {
            setBudgets(prevBudgets => [...prevBudgets, newBudget]);
        }
        setDescription("");
        setAmount(0);
        setAmountPerCheck(0);
        setDateSumbitted(new Date());
        setFutureDate(new Date());
        setModalVisible(false);
    }

    const onClickClose = () => {
        setModalVisible(false);
    }
    return(
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <label
                className="btn text-white text-lg"
                onClick={onClickAddBudget}
                htmlFor="createBudget">Create Budget</label>
            <input
                type="checkbox"
                id="createBudget"
                className="modal-toggle"
                readOnly
                checked={modalVisible} />
            <CreateBudgetModal
                modalVisible={modalVisible}
                description={description}
                amount={amount}
                amountPerCheck={amountPerCheck}
                updateDescription={updateDescription} 
                updateAmount={updateAmount}
                updateAmountPerCheck={updateAmountPerPayCheck}
                updateSubmittedDate={updateDateSubmitted}
                updateFutureDate={updateFutureDate} 
                onClickClose={onClickClose}
                onClickSubmit={onClickSubmit} />
        </div>
    );
}

export default AddBudgetButton