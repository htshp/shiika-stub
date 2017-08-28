import * as net from 'net';
import * as http from 'http';
import { Stub } from './stub';
import { splitPath } from './util';
import { findStubResponse } from './find-stub-response';

export interface ServerOption {
  port?: number;
  proxy?: string;
}

const DEFAULT_OPTION: ServerOption = {
  port: 3000,
  proxy: undefined,
};

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
      if (!req.method) { throw 'req.method is empty'; }

      const { path, query } = splitPath(req.url);

      const stubResponse = findStubResponse(path, stub, req.method);

      if (typeof stubResponse === 'function') {

      } else {

      }
    }).listen(option ? option.port : 3000);
  }

  stop(): void {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }
}
