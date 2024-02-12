// Contain all the buttons found on the home page
import { Link } from "react-router-dom";

const HomePageButtons = () => {
  return (
    <div>
      <p className="text-xl underline">Navigation Buttons</p>
      <div className="flex flex-col space-y-5 btn-group btn-group-vertical m-5">
        <Link to="/yourbible" className="btn outline outline-offset-2 outline-2 outline-red-500
        text-lg max-w-fit bg-white text-black hover:bg-gray-400 text-lg w-full">
          YourBible
        </Link>
        <Link to="/willflix" className="btn outline outline-offset-2 outline-2 outline-red-500
        text-lg max-w-fit bg-white text-black hover:bg-gray-400 text-lg w-full">
          WillFlix
        </Link>
      </div>
    </div>
  );
};

export default HomePageButtons;