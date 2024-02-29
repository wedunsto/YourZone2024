import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

const RegisterView = () => {
    return (
        <div>
            <div className="grow flex justify-center">
                <Header />
            </div>
            <RegisterForm />
        </div>
    );
}

export default RegisterView;