import { HTMLInputTypeAttribute, LegacyRef } from "react";

// Formated input field for username, password, or matching password
interface CredentialInputFieldProp {
    title: string,
    property: HTMLInputTypeAttribute,
    value: string,
    valid: boolean,
    ref: LegacyRef<HTMLInputElement> | undefined,
    setCredential: Function,
    setFocus: Function
}
const CredentialInputField = ({title, property, value, valid, ref, setCredential, setFocus}: CredentialInputFieldProp) => {
    return(
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{title}</span>
            </div>
            <input 
                type={property}
                id={title}
                ref={ref}
                autoComplete="off"
                onChange={(input) => setCredential(input.target.value)}
                value={value}
                required
                aria-invalid={valid ? "false" : true}
                aria-describedby="uidnote"
                onFocus={setFocus(true)}
                onBlur={setFocus(false)}
                className="input input-bordered w-full max-w-xs" />
        </label>
    );
}

export default CredentialInputField;