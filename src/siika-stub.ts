import * as net from 'net';
import * as http from 'http';
import { Stub, StubResponse } from './stub';
import { ServerOption } from './server';
import { splitPath, isHttpMethod, isString } from './util';

function

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

  private findStubResponse(path: string[], stub: Stub): StubResponse {
    for (const stubPath of Object.keys(stub)) {
      // ignore if stub is http method
      if (isHttpMethod(stubPath)) continue;

      // 文字列型なら完全一致 or :id
      if (isString(stubPath)) {
        if (stubPath[0] === ':') {
          // any match

        } else {
          // perfect match
          if (firstPath === stubPath) {
            return this.findStubResponse(
              path.split('/').slice(1).join(),
              stub[stubPath]);
          }
        }
      }

      // 文字列型以外ならエラーを吐く。
      throw 'スタブのパス名に文字列型以外が混じっている。';
    }
  }
}
