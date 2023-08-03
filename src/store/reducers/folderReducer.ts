import { FolderAction, FolderActionType, IFolderState } from "../../types/folder";

const initialState : IFolderState = {
    folders: [],
    loading: false,
    errors: [],
    errorType: ""
}

export const folderReducer = (state = initialState, action: FolderAction) : IFolderState => {
    switch(action.type) {
        case FolderActionType.FETCH_FOLDERS : {
            return {loading: true, folders: [], errors: [], errorType: ""}
        }
        case FolderActionType.FETCH_FOLDERS_SUCCESS : {
            return {loading: false, folders: action.payload, errors: [], errorType: ""}
        }
        case FolderActionType.FETCH_FOLDERS_ERROR : {
            return {loading: false, folders: [], errors: action.payload.errors, errorType: action.payload.errorType, }
        }
        case FolderActionType.CREATE_FOLDER_SUCCESS : {
            return {...state, folders: [action.payload, ...state.folders]}
        }
        case FolderActionType.CREATE_FOLDER_ERROR : {
            return {...state, errors: action.payload.errors, errorType: action.payload.errorType}
        }
        case FolderActionType.CREATE_ENDPOINT_SUCCESS : {
            return {...state, folders: state.folders.map(folder => {
                if(folder.id == action.payload.folderId) {  
                    return {...folder, endpoints: [...folder.endpoints, action.payload.endpoint]}
                }

                return folder;
            })}
        }
        default:
            return state;
    }
}