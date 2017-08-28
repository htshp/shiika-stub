export type ResponseBody = any;

export interface Stub {
  [path: string]: Stub;
  GET: StubResponse;
  POST: StubResponse;
  PUT: StubResponse;
  Delete: StubResponse;
}

export interface Request {
  method: string;
  path: string;
  headers: { [headerName: string]: string };
  query: { [queryName: string]: string };
  params: { [paramName: string]: string };
  body: string;
}

export type Response = ResponseBody | {
  status: number;
  body: ResponseBody;
  headers: { [headerName: string]: string };
};

export type Action = (req: Request) => Response;

export type StubResponse = Action | Response;
