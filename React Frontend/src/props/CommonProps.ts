interface accessTokenProp {
    id: string;
    accessToken: string;
    username: string;
    password: string;
    roles: Array<number>
}

export interface AuthProp {
    auth: accessTokenProp;
    setAuth: (e: object) => void
}

interface ResponseProp {
    status: number
}

export interface ErrorProp {
    response: ResponseProp
}