import * as ProjectActionCreators from "./project";
import * as FolderActionCreators from "./folder";
import * as EndpointActionCreators from "./endpoint";
import * as AuthActionCreators from "./auth";

export default {
    ...ProjectActionCreators,
    ...FolderActionCreators,
    ...EndpointActionCreators,
    ...AuthActionCreators
}