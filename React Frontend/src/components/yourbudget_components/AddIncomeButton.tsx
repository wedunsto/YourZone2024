import { useState } from 'react';
import AddIncomeModal from './AddIncomeModal';


const AddIncomeButton = () => {
    const [ modalVisible, setModalVisible] = useState<boolean>(false);

    const onClickAddIncome = () =>{
        setModalVisible(true);
    }

    const onClickClose = () => {
        setModalVisible(false);
    }

    return(
        <div>
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
                modalVisible={modalVisible}
                onClickClose= {onClickClose} />
        </div>
    );
}

export default AddIncomeButton;