import ApiConstants from "../../constants/ApiConstants";
import LocalStorageConstants from "../../constants/LocalStorageConstants";
import ApiService from "../ApiService";
import {IRefreshToken} from "../../interfaces/auth";
import {ISignIn} from "../../interfaces/auth";

function isLoggedIn() {
    let accessToken = localStorage.getItem(LocalStorageConstants.AccessToken);
    return accessToken != null;
}

async function getAccessToken() {
    const accessTokenExpiresUnix = localStorage.getItem(LocalStorageConstants.AccessTokenExpiresAtUtc);
    if(accessTokenExpiresUnix == null) {
        return;
    }

    if (isExpired(new Date(parseInt(accessTokenExpiresUnix) * 1000))) {
        await refresh();
    }

    const accessToken = localStorage.getItem(LocalStorageConstants.AccessToken);

    if (!accessToken) {
        return null;
    }

    return accessToken;
}

async function refresh() {
    const accessToken = localStorage.getItem(LocalStorageConstants.AccessToken);
    const refreshToken = localStorage.getItem(LocalStorageConstants.RefreshToken);
    const refreshTokenExpiresUnix = localStorage.getItem(LocalStorageConstants.RefreshTokenExpiresAtUtc);
    
    if(refreshTokenExpiresUnix == null) {
        return;
    }

    if (isExpired(new Date(parseInt(refreshTokenExpiresUnix) * 1000))) {
        logout();
        window.location.reload();
    }

    const url = ApiConstants.RefreshToken();
    const model= { 
        accessToken: accessToken,
        refreshToken: refreshToken,
    };

    const response = await ApiService.SendPostRequest<IRefreshToken>(url, model, true);
    if (response?.isSuccessed) {
        signIn(response.data as ISignIn);
        return;
    }

    logout();

    // Happens on dev env since react sends 2 requests.
    console.error("Failed to refresh token.");
}

function signIn(data : ISignIn) {
    localStorage.setItem(LocalStorageConstants.AccessToken, data.jwt.accessToken);
    localStorage.setItem(LocalStorageConstants.AccessTokenExpiresAtUtc, toUnix(data.jwt.expiresAtUtc).toString());
    localStorage.setItem(LocalStorageConstants.RefreshToken, data.refreshToken.token);
    localStorage.setItem(LocalStorageConstants.RefreshTokenExpiresAtUtc, toUnix(data.refreshToken.expiresAtUtc).toString());
    localStorage.setItem(LocalStorageConstants.UserId, data.userId);
}

function logout() {
    localStorage.removeItem(LocalStorageConstants.AccessToken);
    localStorage.removeItem(LocalStorageConstants.AccessTokenExpiresAtUtc);
    localStorage.removeItem(LocalStorageConstants.RefreshToken);
    localStorage.removeItem(LocalStorageConstants.RefreshTokenExpiresAtUtc);
    localStorage.removeItem(LocalStorageConstants.UserId);
}

function getUserId() {
    return localStorage.getItem(LocalStorageConstants.UserId);
}

function isExpired(expiresUnix : Date) : boolean {
    const unixNow = toUnix(new Date());
    return unixNow > toUnix(expiresUnix);
}

function toUnix(utcDateTime : Date) {
    return Math.floor(new Date(utcDateTime).getTime() / 1000);
}

export default {
    isLoggedIn,
    getAccessToken,
    signIn,
    logout,
    getUserId,
};