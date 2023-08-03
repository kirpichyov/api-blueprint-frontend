import { ProjectAction, ProjectActionTypes, IProjectState } from "../../types/project";

const initialState : IProjectState = {
    projects: [],
    loading: false,
    errors: [],
    errorType: ""
}

export const projectReducer = (state = initialState, action: ProjectAction) : IProjectState => {
    switch(action.type) {
        case ProjectActionTypes.FETCH_PROJECTS : {
            return {loading: true, projects: [], errors: [], errorType: ""}
        }
        case ProjectActionTypes.FETCH_PROJECTS_SUCCESS : {
            return {loading: false, projects: action.payload, errors: [], errorType: ""}
        }
        case ProjectActionTypes.FETCH_PROJECTS_ERROR : {
            return {loading: false, projects: [], errors: action.payload.errors, errorType: action.payload.errorType, }
        }
        case ProjectActionTypes.CREATE_PROJECT_SUCCESS : {
            return {...state, projects: [action.payload, ...state.projects]}
        }
        case ProjectActionTypes.CREATE_PROJECT_ERROR : {
            return {...state, errors: action.payload.errors, errorType: action.payload.errorType}
        }
        default:
            return state;
    }
}