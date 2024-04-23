// Contain all the buttons found on the home page
import { Link } from "react-router-dom";

const HomePageButtons = () => {
  return (
    <div>
      <div className="flex flex-col space-y-5 btn-group btn-group-vertical m-5">
        <Link to="/yourbible" className="btn text-lg">
          YourBible
        </Link>
      </div>
    </div>
  );
};

export default HomePageButtons;