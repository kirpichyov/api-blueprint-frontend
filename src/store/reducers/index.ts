import { combineReducers } from "redux";
import { projectReducer } from "./projectReducer";
import { folderReducer } from "./folderReducer";
import { endpointReducer } from "./endpointReducer";

export const rootReducer = combineReducers({
    project: projectReducer,
    folder: folderReducer,
    endpoint: endpointReducer
});

export type RootState = ReturnType<typeof rootReducer>