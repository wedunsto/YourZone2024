export interface accessTokenProp {
    id: string;
    accessToken: string
}

export interface AuthProp {
    auth: accessTokenProp
}

export interface ErrorProp {
    response: string
}

export interface NoteProp {
    _id: string
    title: string
}