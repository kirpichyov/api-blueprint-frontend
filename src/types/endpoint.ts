import { IEndpoint } from "../interfaces/endpoint"

export interface IEndpointState {
    endpoint: IEndpoint | null,
    loading: boolean,
    errors: any[],
    errorType: string
}

interface FetchEndpointAction {
    type: EndpointActionType.FETCH_ENDPOINT
}

interface FetchEndpointSuccessAction {
    type: EndpointActionType.FETCH_ENDPOINT_SUCCESS
    payload: IEndpoint
}

interface FetchEndpointErrorAction {
    type: EndpointActionType.FETCH_ENDPOINT_ERROR
    payload: {
        errors: any[],
        errorType: string
    }
}

interface UpdateEndpointRequestAction {
    type : EndpointActionType.UPDATE_ENDPOINT_REQUEST
}

interface UpdateEndpointRequestSuccessAction {
    type : EndpointActionType.UPDATE_ENDPOINT_REQUEST_SUCCESS,
    payload: IEndpoint
}

interface UpdateEndpointRequestErrorAction {
    type : EndpointActionType.UPDATE_ENDPOINT_REQUEST_ERROR,
    payload: {
        errors: any[],
        errorType: string
    }
}

interface ResetEndpointAction {
    type : EndpointActionType.RESET_ENDPOINT,
}

export enum EndpointActionType {
    FETCH_ENDPOINT = "FETCH_ENDPOINT",
    FETCH_ENDPOINT_SUCCESS = "FETCH_ENDPOINT_SUCCESS",
    FETCH_ENDPOINT_ERROR = "FETCH_ENDPOINT_ERROR",
    UPDATE_ENDPOINT_REQUEST = "UPDATE_ENDPOINT_REQUEST",
    UPDATE_ENDPOINT_REQUEST_SUCCESS = "UPDATE_ENDPOINT_REQUEST_SUCCESS",
    UPDATE_ENDPOINT_REQUEST_ERROR = "UPDATE_ENDPOINT_REQUEST_ERROR",
    RESET_ENDPOINT = "RESET_ENDPOINT"
}

export type EndpointAction = 
FetchEndpointAction 
| FetchEndpointSuccessAction 
| FetchEndpointErrorAction
| UpdateEndpointRequestAction
| UpdateEndpointRequestSuccessAction
| UpdateEndpointRequestErrorAction
| ResetEndpointAction;