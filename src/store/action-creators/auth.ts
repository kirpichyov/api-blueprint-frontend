import ApiConstants from "../../constants/ApiConstants";
import ApiService from "../../services/ApiService";
import AuthContext from "../../services/auth/AuthContext";

export const registerUser = (model : any) => {
    return async () => {
        const response = await ApiService.SendPostRequest<any>(ApiConstants.RegisterUser(), model);
        
        if(response?.isSuccessed) {
            window.location.reload();
            return;
        }

        if(response?.isBadRequest || response?.isNotFound) {
            console.log(response.errorType, response.errors);
        }
    }
}

export const signIn = (model : any) => {
    return async () => {
        const response = await ApiService.SendPostRequest<any>(ApiConstants.SignInUser(), model);
        
        if(response?.isSuccessed) {
            AuthContext.signIn(response.data);
            window.location.reload();
            return;
        }

        if(response?.isBadRequest || response?.isNotFound) {
            console.log(response.errorType, response.errors);
        }
    }
}

