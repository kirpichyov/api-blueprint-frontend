const backendUrl = "https://localhost:5001";
const authEndpoint = 'auth';
const projectsEndpoint = 'projects';
const foldersEndpoint = 'folders';
const endpointsEndpoint = 'endpoints';

const RegisterUser = () => GetUrl(authEndpoint + '/register');
const SignInUser = () => GetUrl(authEndpoint + '/sign-in');
const RefreshToken = () => GetUrl(authEndpoint + '/refresh');

const GetProjects = () => GetUrl(projectsEndpoint + '/summary');
const Projects = () => GetUrl(projectsEndpoint);
const Project = (id : string) => GetUrl(projectsEndpoint + `/${id}`);

const Folders = (id: string) => GetUrl(projectsEndpoint + `/${id}` + '/folders');

const CreateEndpoint = (id: string) => GetUrl(foldersEndpoint + `/${id}` + '/endpoints');
const UpdateEndpointRequest = (id : string) => GetUrl(endpointsEndpoint + `/${id}` + '/request'); 
const GetEndpoint = (id : string) => GetUrl(endpointsEndpoint + `/${id}`);

function GetUrl(relativeRoute : string) {
    return `${backendUrl}/api/v1/${relativeRoute}`;
}

export default {
    RegisterUser,
    SignInUser,
    RefreshToken,
    GetProjects,
    Projects,
    Folders,
    CreateEndpoint,
    GetEndpoint,
    UpdateEndpointRequest
}