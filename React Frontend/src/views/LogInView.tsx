import Header from "../components/Header";
import LogInForm from "../components/LogInForm";

const LogInView = () => {
    return (
        <div>
            <div className="grow flex justify-center">
                <Header />
            </div>
            <LogInForm />
        </div>
    );
}

export default LogInView;