import "../styles/LogInStyles.css";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBible } from '@fortawesome/free-solid-svg-icons';
import LogInMenu from "../components/login_components/LogInMenu";
import BibleStudy from "../../assets/images/BibleStudy.webp";
import Finances from "../../assets/images/Finances.webp";
import Workout from "../../assets/images/Workout.webp";
import LogInForm from "../components/login_components/LogInForm";

const imagesSources = [BibleStudy, Finances, Workout];

const LogInView = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(()=>{
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % imagesSources.length);
          }, 5000);
      
          return () => clearInterval(intervalId);
    },[]);

    return (
        <div className="login-background h-screen w-screen">
            <div className="login-header">
                <div className="login-logo">
                    <FontAwesomeIcon icon={faBookBible}/>
                    <p className="login-logo-text">YourZone</p>
                    <LogInMenu />
                </div>
            </div>
            <p className="page-description">Empowering your spiritual, financial, and fitness journey</p>
            <p className="page-sub-description">Track your goals like never before with our innovative online platform.</p>
            <div className="get-started flex flex-row">
                <button onClick={() => setShowLogin(!showLogin)} className="get-started-button">Get Started</button>
                {showLogin? <LogInForm /> : null}
            </div>
            <img className="preview" src={imagesSources[imageIndex]} />
        </div>
    );
}

export default LogInView;