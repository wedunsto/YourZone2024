import { createContext, useState } from "react";

interface AuthProviderProp {
    children: any
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthProviderProp) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;