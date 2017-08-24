import { ServerOption } from './server';
import { Stub, StubResponse } from './stub';
import * as http from 'http';
import * as net from 'net';
import { isString, isHttpMethod, getFirstPath } from './util';

export interface ServerOption {
  port?: number;
  proxy?: string;
}

const DEFAULT_OPTION: ServerOption = {
  port: 3000,
  proxy: undefined,
};

export class Server {
  private server: net.Server;

  constructor() { }

  start(stub: Stub, option?: ServerOption) {
    this.server = http.createServer((req, res) => {

    }).listen(option ? option.port : 3000);
  }

  stop() {
    this.server.close();
  }

  private findStubResponse(path: string, stub: Stub): StubResponse {
    const firstPath = getFirstPath(path);

    for (const stubPath of Object.keys(stub)) {
      // HTTPメソッド名は弾く
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
