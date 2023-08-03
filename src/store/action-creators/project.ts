import { Dispatch } from "redux";
import { ProjectAction, ProjectActionTypes } from "../../types/project";
import ApiService from "../../services/ApiService";
import IProject from "../../interfaces/project";
import ApiConstants from "../../constants/ApiConstants";

export const fetchProjects = () => {
    return async (dispatch: Dispatch<ProjectAction>) => {
        dispatch({type: ProjectActionTypes.FETCH_PROJECTS})

        const response = await ApiService.SendGetRequest<IProject[]>(ApiConstants.GetProjects());
        
        if(response?.isSuccessed) {
            const projects = response.data as IProject[];

            dispatch({type: ProjectActionTypes.FETCH_PROJECTS_SUCCESS, payload: projects})
            return
        }

        if(response?.isBadRequest || response?.isNotFound) {
            dispatch({type: ProjectActionTypes.FETCH_PROJECTS_ERROR, payload: {
                errors: response.errors, errorType: response.errorType
            }})
        }
    }
}


export const createProject = (project: any) => {
    return async (dispatch: Dispatch<ProjectAction>) => {
        const url = ApiConstants.Projects();
        const response = await ApiService.SendPostRequest<IProject>(url, project);

        if(response?.isSuccessed) {
            dispatch({type: ProjectActionTypes.CREATE_PROJECT_SUCCESS, payload: response?.data})
        }
        
        if(response?.isBadRequest || response?.isNotFound) {
            dispatch({type: ProjectActionTypes.FETCH_PROJECTS_ERROR, payload: {
                errors: response.errors, errorType: response.errorType
            }})
        }
    }
}