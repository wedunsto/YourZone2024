// Contain all the buttons found on the home page
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useState } from "react";

const HomePageButtons = () => {
  const [errorMessage, setErrorMessage] = useState("");
  
  return (
    <div>
      {errorMessage? <p>{errorMessage}</p> : null}
      <p className="text-white text-xl underline">Navigation Buttons</p>
      <div className="flex flex-col space-y-5 btn-group btn-group-vertical m-5">
        <Link to="/yourbible" className="btn text-lg">
          YourBible
        </Link>
        <LogoutButton setErrorMessage={setErrorMessage} />
      </div>
    </div>
  );
};

export default HomePageButtons;