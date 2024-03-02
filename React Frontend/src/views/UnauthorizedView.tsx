// View reached when a user without sufficient access reaches an application feature
import { useNavigate } from "react-router-dom"

const UnauthorizedView = () => {
    const navigate = useNavigate();

    // Return to the last page accessed
    const goBack = () => navigate(-1);

    const emailAddress = 'dunstapp@gmail.com';

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <p>If you have just registered, please email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
            <p>with your full name and username, so that I can manually approve your access.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    );
}

export default UnauthorizedView;
