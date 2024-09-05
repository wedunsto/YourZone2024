interface accessTokenProp {
    id: string;
    accessToken: string;
    username: string;
    password: string;
    roles: Array<number>
}

interface AuthProp {
    auth: accessTokenProp;
    setAuth: (e: object) => void
}

interface ResponseProp {
    status: number
}

interface ErrorProp {
    response: ResponseProp
}