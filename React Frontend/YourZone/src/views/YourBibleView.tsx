import YourBibleButtons from "../components/yourbible_components/YourBibleButtons";
import YourBibleHeader from "../components/yourbible_components/YourBibleHeader";
import axios from "../api/axios";

const BIBLE_URL = '/biblestudy';

const YourBibleView = () => {
    return(
        <div>
            <div className="grow flex justify-center">
                <YourBibleHeader />
            </div>
            <div className="flex grow ml-5">
                <YourBibleButtons />
            </div>
        </div>
    );
}

export default YourBibleView;