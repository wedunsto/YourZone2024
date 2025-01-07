// Button used to go back to the home page

import { useNavigate } from "react-router-dom";

const HomeButton = () => {
    const navigate = useNavigate();
    
    return(
        <button className="text-lg w-full" onClick={() => navigate("/home")}>Home</button>
    );
}

export default HomeButton;