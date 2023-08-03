import IProject from "../interfaces/project"

export interface IProjectState {
    projects: IProject[],
    loading: boolean,
    errors: any[],
    errorType: string
}

interface FetchProjectAction {
    type: ProjectActionTypes.FETCH_PROJECTS
}

interface FetchProjectSuccessAction {
    type: ProjectActionTypes.FETCH_PROJECTS_SUCCESS
    payload: IProject[]
}

interface FetchProjectErrorAction {
    type: ProjectActionTypes.FETCH_PROJECTS_ERROR
    payload: {
        errors: any[],
        errorType: string
    }
}

interface CreateProjectSuccessAction {
    type: ProjectActionTypes.CREATE_PROJECT_SUCCESS,
    payload: IProject
}

interface CreateProjectErrorAction {
    type: ProjectActionTypes.CREATE_PROJECT_ERROR,
    payload: {
        errors: any[],
        errorType: string
    }}

export enum ProjectActionTypes {
    FETCH_PROJECTS = "FETCH_PROJECTS",
    FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS",
    FETCH_PROJECTS_ERROR = "FETCH_PROJECTS_ERROR",
    CREATE_PROJECT_SUCCESS = "CREATE_FROJECT_SUCCESS",
    CREATE_PROJECT_ERROR = "CREATE_FROJECT_ERROR",
}

export type ProjectAction = 
    FetchProjectAction 
    | FetchProjectSuccessAction 
    | FetchProjectErrorAction 
    | CreateProjectSuccessAction
    |CreateProjectErrorAction;