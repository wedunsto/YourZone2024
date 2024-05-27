// View of the home page, containing navigation buttons and descriptions of features
import "../styles/HomePageStyles.css";
import Header from "../components/Header";
import HomePageButton from "../components/home_page_components/HomePageButton";
import YourBibleButton from "../../assets/images/YourBibleButton.webp";
import YourExpensesButton from "../../assets/images/YourExpensesButton.webp";

const buttonProps= [{imageSrc: `${YourBibleButton}`,
                     title: "YourBible", subTitle: "Track your Bible verses", destination: "/yourbible"},
                    {imageSrc: `${YourExpensesButton}`,
                     title: "YourExpenses", subTitle: "Track your expenses", destination: "/yourexpenses"}];
const HomePageView = () => {
    return (
        <div className="home-page-background h-screen w-screen">
            <div className="grow flex justify-center">
                <Header textColor="text-white" title="YourZone" subTitle="Your tools, your content" />
            </div>
            <div className="m-5 grid grid-cols-4 gap-4">
                {buttonProps.map((buttonProp)=>(
                    <HomePageButton
                        imageSrc={buttonProp.imageSrc}
                        title={buttonProp.title}
                        subTitle={buttonProp.subTitle}
                        destination={buttonProp.destination}
                     />
                ))}
            </div>
        </div>
    );
}

export default HomePageView;