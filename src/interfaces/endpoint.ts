import { HttpMethod } from "../enums";

interface IEndpoint {
    id : string,
    title: string,
    path: string,
    method: HttpMethod,
    request: IResponseRequestEndpoint,
    response: IResponseRequestEndpoint
}

interface IResponseRequestEndpoint {
    contentType: string,
    statusCode?: number,
    contentJson: {},
    parameters : IParameter[]
}

interface IParameter {
    name: string,
    in: EndpointParameterLocation,
    dataType: string,
    notes: string,
}

enum EndpointParameterLocation {
    query,
    header,
    path
}

export type {IEndpoint, IResponseRequestEndpoint};