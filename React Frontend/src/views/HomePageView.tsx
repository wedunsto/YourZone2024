// View of the home page, containing navigation buttons and descriptions of features
import "../styles/HomePageStyles.css";
import Header from "../components/Header";
import HomePageButtons from "../components/HomePageButtons";

const HomePageView = () => {
    return (
        <div className="home-page-background h-screen w-screen">
            <div className="grow flex justify-center">
                <Header />
            </div>
            <div className="flex grow ml-5">
                <HomePageButtons />
            </div>
        </div>
    );
}

export default HomePageView;