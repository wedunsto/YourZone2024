// Create the header text for Your Zone homepage
import "../styles/HomePageStyles.css";
import LogoutButton from "./LogoutButton";

const Header = () => {
  return (
    <div className="container">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl text-white font-bold">Your Zone</h1>
          <p className="py-6 text-white">Your tools, your content</p>
        </div>
      </div>
      <LogoutButton />
  </div>
  );
};

export default Header;