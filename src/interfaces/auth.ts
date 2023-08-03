
interface IRefreshToken {
    token: string,
    expiresAtUtc : Date
}

interface IJwt {
    accessToken : string,
    expiresAtUtc : Date
}

interface ISignIn {
    userId : string,
    refreshToken : IRefreshToken,
    jwt :  IJwt
}

export type {
    IRefreshToken,
    ISignIn
}