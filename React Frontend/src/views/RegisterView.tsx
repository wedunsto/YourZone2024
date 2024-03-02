// Component allowing users to register for access.
// Registered users are given the "Submitted" status and must request access
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