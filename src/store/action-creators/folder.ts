import { Dispatch } from "redux";
import ApiService from "../../services/ApiService";
import ApiConstants from "../../constants/ApiConstants";
import { FolderAction, FolderActionType } from "../../types/folder";
import { IFolder, IFolderEndpoint } from "../../interfaces/folder";

export const fetchFolders = (projectId : string) => {
    return async (dispatch: Dispatch<FolderAction>) => {
        dispatch({type: FolderActionType.FETCH_FOLDERS})

        const response = await ApiService.SendGetRequest<IFolder[]>(ApiConstants.Folders(projectId));
        
        if(response?.isSuccessed) {
            const folders = response.data as IFolder[];

            dispatch({type: FolderActionType.FETCH_FOLDERS_SUCCESS, payload: folders})
            return;
        }

        if(response?.isBadRequest || response?.isNotFound) {
            dispatch({type: FolderActionType.CREATE_FOLDER_ERROR, payload: {
                errors: response.errors, errorType: response.errorType
            }})
        }
    }
}


export const createFolder = (folder: any, projectId: string) => {
    return async (dispatch: Dispatch<FolderAction>) => {
        const url = ApiConstants.Folders(projectId);
        const response = await ApiService.SendPostRequest<IFolder>(url, folder);

        if(response?.isSuccessed) {
            dispatch({type: FolderActionType.CREATE_FOLDER_SUCCESS, payload: response?.data})
        }
        
        if(response?.isBadRequest || response?.isNotFound) {
            dispatch({type: FolderActionType.CREATE_FOLDER_ERROR, payload: {
                errors: response.errors, errorType: response.errorType
            }})
        }
    }
}

export const createEndpointForFolder = (endpoint : any, folderId : string) => {
    return async (dispatch: Dispatch<FolderAction>) => {
        const url = ApiConstants.CreateEndpoint(folderId);
        const response = await ApiService.SendPostRequest<IFolderEndpoint>(url, endpoint);
        if(response?.isSuccessed) {
            dispatch({type: FolderActionType.CREATE_ENDPOINT_SUCCESS, payload: {
                folderId: folderId,
                endpoint: response?.data
            }})
        }
    }
}