import "../styles/LogInStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBible } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header";
import LogInForm from "../components/LogInForm";
import LogInMenu from "../components/LogInMenu";

const LogInView = () => {
    return (
        <div className="login-background h-screen w-screen">
            <div className="login-header"></div>
            <div className="login-logo">
                <FontAwesomeIcon icon={faBookBible}/>
                <p className="login-logo-text">YourZone</p>
                <LogInMenu />
            </div>
            
            <div className="flex justify-center">
                <Header />
            </div>
            <LogInForm />
        </div>
    );
}

export default LogInView;