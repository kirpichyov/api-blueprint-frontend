import { HttpMethod } from "../enums";
import { IResponseRequestEndpoint } from "./endpoint";


interface IFolder {
    id: string,
    name: string,
    createdAtUtc: Date,
    endpoints: IResponseRequestEndpoint []
}

interface IFolderEndpoint {
    id: string,
    title: string,
    path: string,
    method: HttpMethod
}

export type {
    IFolder, IFolderEndpoint
}