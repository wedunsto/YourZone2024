import { HTMLInputTypeAttribute } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Formatted input field for username, password, or matching password
interface CredentialInputFieldProp {
    title: string,
    property: HTMLInputTypeAttribute,
    value: string,
    valid: boolean | null,
    setCredential: (e: string) => void
}
const CredentialInputField = ({title, property, value, valid, setCredential}: CredentialInputFieldProp) => {
    return(
        <label htmlFor={title} className="form-control w-full max-w-xs">
            <div className="label">
                <span className="text-white label-text">{title}</span>
                {valid == null? null : valid && !(value == '') == true ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
            </div>
            <input 
                type={property}
                id={title}
                autoComplete="off"
                onChange={(input) => setCredential(input.target.value)}
                value={value}
                required
                aria-invalid={valid ? "false" : true}
                aria-describedby="uidnote"
                className="input input-bordered w-full max-w-xs" />
        </label>
    );
}

export default CredentialInputField;