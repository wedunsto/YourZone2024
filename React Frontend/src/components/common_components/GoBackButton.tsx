// Button used to return to the most recently viewed page

import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
    const navigate = useNavigate();

    // Goes back 1 page
    const handleGoBack = () => {
        navigate(-1);
    }

    return(
        <div>
            <button className="text-lg w-full" onClick={handleGoBack}>Go Back</button>
        </div>
    );
}

export default GoBackButton;