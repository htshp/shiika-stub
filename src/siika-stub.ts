import * as net from 'net';
import * as http from 'http';
import { Stub, StubResponse } from './stub';
import { ServerOption } from './server';
import { splitPath, isHttpMethod, isString } from './util';

export function findStubResponse(path: string[], stub: Stub, method: string): {
  params: { [paramName: string]: string },
  res: StubResponse
} {
  // returnstub responce ifpath is empty
  if (path.length === 0) { return { params: {}, res: stub[method] }; }

  const firstPath = path[0];
  for (const stubPath of Object.keys(stub)) {
    // ignore if stub is http method
    if (isHttpMethod(stubPath)) continue;

    // if stubPath type is string
    if (isString(stubPath)) {
      if (stubPath[0] === ':') {
        // any match
        const res = findStubResponse(path, stub[stubPath], method);
        res.params[stubPath.slice(1)] = firstPath;
        return res;
      } else {
        // perfect match
        if (firstPath === stubPath) {
          return this.findStubResponse(
            path.split('/').slice(1).join(),
            stub[stubPath]);
        }
      }
    }

    // error stubPath type is out of domain
    throw 'stubPath type is out of domamin';
  }
}

export class SiikaStub {
  private server: net.Server | null = null;

  constructor() { }

  start(stub: Stub, option?: ServerOption) {
    // Duplicate start server.
    if (this.server) {
      throw 'duplicate';
    }

    // Start server.
    this.server = http.createServer((req, res) => {
      if (!req.url) { throw 'req.url is empty'; }

      const { path, query } = splitPath(req.url);
    }).listen(option ? option.port : 3000);
  }

  stop(): void {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }
}
