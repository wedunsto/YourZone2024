// Create the header text for Your Zone homepage
import "../styles/HomePageStyles.css";
import LogoutButton from "./LogoutButton";

interface HeaderProp {
  textColor: string;
  title: string;
  subTitle: string
}

const Header = ({textColor, title, subTitle}: HeaderProp) => {
  return (
    <div className="container">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className={`text-5xl ${textColor} font-bold`}>{title}</h1>
          <p className={`"py-6 ${textColor}`}>{subTitle}</p>
        </div>
      </div>
      <LogoutButton />
  </div>
  );
};

export default Header;