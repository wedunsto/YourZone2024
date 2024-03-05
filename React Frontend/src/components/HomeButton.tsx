// Button used to go back to the home page

import { useNavigate } from "react-router-dom";

const HomeButton = () => {
    const navigate = useNavigate();
    
    return(
        <button className="text-lg" onClick={() => navigate("/home")}>Home</button>
    );
}

export default HomeButton;