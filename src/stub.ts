export type Body = any;

export interface Stub {
    [ path: string ]: Stub;
    GET:    Body | Action;
    POST:   Body | Action;
    PUT:    Body | Action;
    Delete: Body | Action;
}

export interface Request {
    method: string;
    path: string;
    headers: { [headerName: string]: string };
    query: { [queryName: string]: string };
    params: { [paramName: string]: string };
    body: string; // リクエストのbodyはstring型固定
}

export interface Response {
    status: number;
    body: Body;
    headers: { [headerName: string]: string };
}

export type Action = (req: Request) => Response | Body;
