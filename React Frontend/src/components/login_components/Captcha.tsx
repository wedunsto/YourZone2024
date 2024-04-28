import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = import.meta.env.VITE_SITE_KEY;

interface CaptchaProp {
    setCaptchaVerified: (e: boolean) => void
}

const Captcha = ({ setCaptchaVerified }: CaptchaProp) => {
    const handleCaptchaChange = () => {
        // Value: Response from reCAPTCH. Used to verify the user on the server
        setCaptchaVerified(true);
    }

    return(
        <div className='my-5'>
            <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={handleCaptchaChange}
        />
        </div>
    );
}

export default Captcha;