import ApiConstants from "../../constants/ApiConstants";
import {IEndpoint, IResponseRequestEndpoint} from "../../interfaces/endpoint";
import ApiService from "../../services/ApiService";
import { EndpointAction, EndpointActionType } from "../../types/endpoint";
import { Dispatch } from "redux";

export const fetchEndpoint = (endpointId : string) => {
    return async (dispatch: Dispatch<EndpointAction>) => {
        dispatch({type: EndpointActionType.FETCH_ENDPOINT})

        const response = await ApiService.SendGetRequest<IEndpoint>(ApiConstants.GetEndpoint(endpointId));
        
        if(response?.isSuccessed) {
            const endpoint = response.data as IEndpoint;

            dispatch({type: EndpointActionType.FETCH_ENDPOINT_SUCCESS, payload: endpoint})
            return;
        }

        if(response?.isBadRequest || response?.isNotFound) {
            dispatch({type: EndpointActionType.FETCH_ENDPOINT_ERROR, payload: {
                errors: response.errors, errorType: response.errorType
            }})
        }
    }
}

export const updateEndpointRequest = (id: string, endpointRequest: IResponseRequestEndpoint) => {
    return async (dispatch: Dispatch<EndpointAction>) => {
        dispatch({type: EndpointActionType.UPDATE_ENDPOINT_REQUEST})

        const response = await ApiService.SendPutRequest<IEndpoint>(ApiConstants.UpdateEndpointRequest(id), endpointRequest);
        
        if(response?.isSuccessed) {
            const endpoint = response.data as IEndpoint;

            dispatch({type: EndpointActionType.UPDATE_ENDPOINT_REQUEST_SUCCESS, payload: endpoint})
            return;
        }

        if(response?.isBadRequest || response?.isNotFound) {
            dispatch({type: EndpointActionType.UPDATE_ENDPOINT_REQUEST_ERROR, payload: {
                errors: response.errors, errorType: response.errorType
            }})
        }
    }
}

export const resetEndpount = () => {
    return async (dispatch: Dispatch<EndpointAction>) => {
        dispatch({type: EndpointActionType.RESET_ENDPOINT});
    }
}