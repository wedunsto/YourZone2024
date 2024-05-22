import "../../styles/HomePageStyles.css";
import { useNavigate } from "react-router-dom";

interface HomePageButtonProp {
    imageSrc: string;
    title: string;
    subTitle: string;
    destination: string;
}

const HomePageButton =({imageSrc, title, subTitle, destination}: HomePageButtonProp)=> {
    const navigate = useNavigate();

    return(
        <button className="menu-button flex flex-col items-center border-2 rounded-lg bg-black"
        onClick={() => navigate(`${destination}`)}>
            <img className="border-transparent rounded-full mb-5" src={imageSrc} height={100} width={100}/>
            <span className="text-xl">{title}</span>
            <span className="text-xs">{subTitle}</span>
        </button>
    );
};

export default HomePageButton;