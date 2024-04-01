import Header from "../components/Header";
import LogInForm from "../components/LogInForm";
import "../styles/LogInStyles.css";

const LogInView = () => {
    return (
        <div className="login-background h-screen w-screen">
            <div className="login-header"></div>
            <div className="flex justify-center">
                <Header />
            </div>
            <LogInForm />
        </div>
    );
}

export default LogInView;