import { IFolder, IFolderEndpoint } from "../interfaces/folder"

export interface IFolderState {
    folders: IFolder[],
    loading: boolean,
    errors: any[],
    errorType: string
}

interface FetchFolderAction {
    type: FolderActionType.FETCH_FOLDERS
}

interface FetchFolderSuccessAction {
    type: FolderActionType.FETCH_FOLDERS_SUCCESS
    payload: IFolder[]
}

interface FetchFolderErrorAction {
    type: FolderActionType.FETCH_FOLDERS_ERROR
    payload: {
        errors: any[],
        errorType: string
    }
}

interface CreateFolderSuccessAction {
    type: FolderActionType.CREATE_FOLDER_SUCCESS,
    payload: IFolder
}

interface CreateFolderErrorAction {
    type: FolderActionType.CREATE_FOLDER_ERROR,
    payload: {
        errors: any[],
        errorType: string
    }
}

interface CreateFolderSuccessAction {
    type: FolderActionType.CREATE_FOLDER_SUCCESS,
    payload: IFolder
}

interface CreateEndpointSuccessAction {
    type: FolderActionType.CREATE_ENDPOINT_SUCCESS,
    payload: {
        endpoint: IFolderEndpoint,
        folderId: string
    }
}

export enum FolderActionType {
    FETCH_FOLDERS = "FETCH_FOLDERS",
    FETCH_FOLDERS_SUCCESS = "FETCH_FOLDERS_SUCCESS",
    FETCH_FOLDERS_ERROR = "FETCH_FOLDERS_ERROR",
    CREATE_FOLDER_SUCCESS = "CREATE_FOLDER_SUCCESS",
    CREATE_FOLDER_ERROR = "CREATE_FOLDER_ERROR",
    CREATE_ENDPOINT_SUCCESS = "CREATE_ENDPOINT_SUCCESS"
}

export type FolderAction = 
    FetchFolderAction 
    | FetchFolderSuccessAction 
    | FetchFolderErrorAction 
    | CreateFolderSuccessAction
    | CreateFolderErrorAction
    | CreateEndpointSuccessAction