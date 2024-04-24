// View reached when a user without sufficient access reaches an application feature
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import LogoutButton from "../components/LogoutButton";
import HomeButton from "../components/HomeButton";

const UnauthorizedView = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Return to the last page accessed
    const goBack = () => navigate(-1);

    const emailAddress = 'dunstapp@gmail.com';

    return (
            <div className="flex justify-center">
                {errorMessage? <p>{errorMessage}</p> : null}
                <section className="m-10">
                    <h1 className="text-white">Unauthorized</h1>
                    <br />
                    <p className="text-white text-xl">You do not have access to the requested page.</p>
                    <p className="text-white text-xl">If you have just registered, please email: <a className="underline text-green-300" href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
                    <p className="text-white text-xl">with your full name and username, so that I can manually approve your access.</p>
                    <div className="my-5 flexGrow">
                        <button onClick={goBack}>Go Back</button>
                        <HomeButton />
                        <LogoutButton />
                    </div>
                </section>
            </div>
    );
}

export default UnauthorizedView;
