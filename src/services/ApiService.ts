import axios from "axios";
import { AxiosError } from "axios";
import AuthContext from "./auth/AuthContext";

const Ok = 200;
const Created = 201;
const NoContent = 204;
const BadRequest = 400;
const NotFound = 404;
const InternalServerError = 500;

const SuccessCodes = [Ok, Created, NoContent];

async function SendPostRequest<T>(url:string, request : any, isAnonymous = false) {
    try {
        const headers = await getHeaders(isAnonymous);
        const response = await axios.post(url, request, { headers });
        
        return new Result<T>(response.data, response.status);
    }
    catch (error) {
        return handleFailedResponse(error);
    }
}

async function SendGetRequest<T>(url: string, queryValues: string = "", isAnonymous = false) {
    const urlWithParams = url + '?' + new URLSearchParams(queryValues);

    try {
        const headers = await getHeaders(isAnonymous);
        const response = await axios.get(urlWithParams, { headers });

        return new Result<T>(response.data, response.status);
    }
    catch (error) {
        return handleFailedResponse(error);
    }
}

async function SendDeleteRequest(url : string, queryValues : string, isAnonymous = false) {
    const urlWithParams = url + '?' + new URLSearchParams(queryValues);

    try {
        const headers = await getHeaders(isAnonymous);
        const response = await axios.delete(urlWithParams, { headers });

        return new Result(response.data, response.status);
    }
    catch (error) {
        return handleFailedResponse(error);
    }
}

async function SendPutRequest<T>(url : string, request : any, isAnonymous = false) {
    try {
        const headers = await getHeaders(isAnonymous);
        const response = await axios.put(url, request, { headers });

        return new Result<T>(response.data, response.status);
    }
    catch (error) {
        return handleFailedResponse(error)
    }
}

async function getHeaders(isAnonymous: boolean) {
    return isAnonymous
        ? {}
        : { Authorization: "Bearer " + await AuthContext.getAccessToken() };
}

function handleFailedResponse<T>(error : unknown) {
    const genericError = error as Error | AxiosError<Result<T>>;

    if(!axios.isAxiosError(genericError)) {
        console.log(genericError.message);
        return;
    }

    if (genericError.response != null) {
        if (genericError.response.status == BadRequest ||
            genericError.response.status == NotFound) {

            return new Result(genericError.response.data, genericError.response.status, genericError.response.data.errors, genericError.response.data.errorType);
        }

        return new Result(null, genericError.response.status, []);
    }

    console.error("Error occurred while request. Details: " + error);
    return null;
}

class Result <T> {
    data : T | null;
    errors : [];
    errorType : string;
    code : number;
    isSuccessed : boolean;
    isBadRequest : boolean;
    isNotFound : boolean;
    isInternalServerError : boolean;

    constructor(data: T | null, code: number, errors: [] = [], errorType: string = "") {
        this.data = data;
        this.code = code;
        this.errors = errors;
        this.errorType = errorType;
        this.isSuccessed = SuccessCodes.includes(code);
        this.isBadRequest = (code == BadRequest);
        this.isNotFound = (code == NotFound);
        this.isInternalServerError = (code == InternalServerError);
    }
}

export default {
    SendPostRequest,
    SendGetRequest,
    SendDeleteRequest,
    SendPutRequest
}