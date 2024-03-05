import Header from "../components/Header";
import LogInForm from "../components/LogInForm";

const LogInView = () => {
    return (
        <div className="h-screen w-screen">
            <div className="flex justify-center">
                <Header />
            </div>
            <LogInForm />
        </div>
    );
}

export default LogInView;