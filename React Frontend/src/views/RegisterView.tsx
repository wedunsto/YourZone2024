// Component allowing users to register for access.
// Registered users are given the "Submitted" status and must request access
import RegisterForm from "../components/RegisterForm";

const RegisterView = () => {
    return (
        <div className="h-screen w-screen">
            <RegisterForm />
        </div>
    );
}

export default RegisterView;