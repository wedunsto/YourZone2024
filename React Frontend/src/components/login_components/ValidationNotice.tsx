// Notice visual stating that the username, password, 
//or matching password are not valid

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface ValidationNoticeProp {
    valid: boolean | null,
    notice: ReactNode
}

const ValidationNotice = ({ valid, notice }: ValidationNoticeProp) => {
    return(
        <div className="text-white m-5">
            {
            valid == false ? 
            <div><FontAwesomeIcon className="my-2" icon={faInfoCircle} />
            {notice}</div>
            : 
            null
        }
        </div>
    );
};

export default ValidationNotice;