import LogoutButton from "../components/LogoutButton";
import HomeButton from "../components/HomeButton";

const MissingView = () => {
    return (
        <div className="flex flex-col">
            <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p className="my-3">Page Not Found</p>
            <HomeButton />
            <LogoutButton />
        </article>
        </div>
    );
}

export default MissingView;
