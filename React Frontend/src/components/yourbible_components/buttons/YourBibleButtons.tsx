/**
 * Menu buttons for the YourBible view:
 *  Create: Creates a new Bible study entry
 */

import { useState } from "react";
import NewYourBibleEntryModal from "../modals/NewYourBibleEntryModal";
import HomeButton from "../../HomeButton";

const YourBibleButtons = () => {
    const [newModalVisible, setNewModalVisible] = useState(false);
    
    const toggleModalVisible = () => {
        setNewModalVisible(false)
    }

    const onClickCreate = () => {
        setNewModalVisible(true);
    }

    return (
        <div className="flex mr-10">
            <div className="flex-1">
                <div className="flex flex-col space-y-3">
                    <label 
                        className="btn"
                        onClick={onClickCreate}
                        htmlFor="createBibleStudy">Add Bible Study Notes</label>
                    <HomeButton />
                </div>
                <input
                    type="checkbox"
                    id="createBibleStudy" 
                    className="modal-toggle"
                    readOnly
                    checked={newModalVisible} />
                <NewYourBibleEntryModal
                    modalVisible={newModalVisible}
                    toggleModalVisible={toggleModalVisible}
                />
            </div>
        </div>
    );
}

export default YourBibleButtons;