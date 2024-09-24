/**
 * Menu buttons for the YourBibleLesson view:
 *  Create: Creates a new Bible lesson entry
 */

import { useState } from "react";
import YourBibleLessonModal from "../modals/YourBibleLessonModal";
import HomeButton from "../../HomeButton";

const YourBibleLessonButtons = () => {
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
                        htmlFor="createBibleStudy">Add Bible Lesson Notes</label>
                    <HomeButton />
                </div>
                <input
                    type="checkbox"
                    id="createBibleStudy" 
                    className="modal-toggle"
                    readOnly
                    checked={newModalVisible} />
                <YourBibleLessonModal 
                    mode={"create"} 
                    modalVisible={newModalVisible} 
                    toggleModalVisible={toggleModalVisible} />
            </div>
        </div>
    );
}

export default YourBibleLessonButtons;