import { Link } from "react-router-dom"

const MissingView = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/home">Visit Our Homepage</Link>
            </div>
        </article>
    );
}

export default MissingView;
