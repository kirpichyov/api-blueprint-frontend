import { EndpointAction, EndpointActionType, IEndpointState } from "../../types/endpoint";

const initialState : IEndpointState = {
    endpoint: null,
    loading: false,
    errors: [],
    errorType: ""
}

export const endpointReducer = (state = initialState, action: EndpointAction) : IEndpointState => {
    switch(action.type) {
        case EndpointActionType.FETCH_ENDPOINT : {
            return {loading: true, endpoint: null, errors: [], errorType: ""}
        }
        case EndpointActionType.FETCH_ENDPOINT_SUCCESS : {
            return {loading: false, endpoint: action.payload, errors: [], errorType: ""}
        }
        case EndpointActionType.FETCH_ENDPOINT_ERROR : {
            return {loading: false, endpoint: null, errors: action.payload.errors, errorType: action.payload.errorType}
        }
        case EndpointActionType.UPDATE_ENDPOINT_REQUEST : {
            return {loading: true, endpoint: null, errors: [], errorType: ""}
        }
        case EndpointActionType.UPDATE_ENDPOINT_REQUEST_SUCCESS : {
            return {loading: false, endpoint: action.payload, errors: [], errorType: ""}
        }
        case EndpointActionType.FETCH_ENDPOINT_ERROR : {
            return {loading: false, endpoint: null, errors: action.payload.errors, errorType: action.payload.errorType}
        }
        case EndpointActionType.RESET_ENDPOINT : {
            return {loading: false, endpoint: null, errors: [], errorType: ""}
        }
        default:
            return state;
    }
}