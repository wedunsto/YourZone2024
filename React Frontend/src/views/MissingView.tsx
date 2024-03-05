import { Link } from "react-router-dom"
import LogoutButton from "../components/LogoutButton";
import { useState } from "react";
import HomeButton from "../components/HomeButton";

const MissingView = () => {
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div className="flex flex-col">
            {errorMessage? <p>{errorMessage}</p> : null}
            <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p className="my-3">Page Not Found</p>
            <HomeButton />
            <LogoutButton setErrorMessage={setErrorMessage}/>
        </article>
        </div>
    );
}

export default MissingView;
