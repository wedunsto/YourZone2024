import "../styles/LogInStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBible } from '@fortawesome/free-solid-svg-icons';
import LogInMenu from "../components/LogInMenu";
import BibleStudy from "../../assets/images/BibleStudy.webp";

const LogInView = () => {
    return (
        <div className="login-background h-screen w-screen">
            <div className="login-header"></div>
            <div className="login-logo">
                <FontAwesomeIcon icon={faBookBible}/>
                <p className="login-logo-text">YourZone</p>
                <LogInMenu />
            </div>
            <p className="page-description">Empowering your spiritual, financial, and fitness journey</p>
            <p className="page-sub-description">Track your goals like never before with our innovative online platform.</p>
            <button className="get-started">Get Started</button>
            <img className="preview" src={BibleStudy} />
        </div>
    );
}

export default LogInView;