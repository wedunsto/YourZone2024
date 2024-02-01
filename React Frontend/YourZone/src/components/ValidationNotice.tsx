// Notice visual stating that the username, password, 
//or matching password are not valid

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface ValidationNoticeProp {
    valid: boolean,
    notice: ReactNode
}

const ValidationNotice = ({ valid, notice }: ValidationNoticeProp) => {
    return(
        <div>
            {
            valid == false ? 
            <p className="m-5" id="uidnote">
                <FontAwesomeIcon className="my-2" icon={faInfoCircle} />
                {notice}
            </p> 
            : 
            null
        }
        </div>
    );
};

export default ValidationNotice;