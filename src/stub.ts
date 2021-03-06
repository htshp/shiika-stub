import { isHttpMethod } from './util';
// Stub type definitions.

export type ResponseBody = any;

export interface Stub {
  [path: string]: Stub | StubResponse;
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

// Stub utility functions.

const PARENT_PROPERTY_KEY = '{AFE471F6-891C-4990-920F-A38EC24591D5}';

/**
 * stubの各階層に親スタブへの参照を付与する。この関数は再帰的に動作する。
 * @param stub
 * @param parent
 */
export function makeParentsTraceable(stub: Stub, parent: Stub | null = null): void {
  stub[PARENT_PROPERTY_KEY] = parent as Stub; // Forcely through null check.

  for (const key of Object.keys(stub)) {
    if (isHttpMethod(key)) { continue; } // HTTPメソッド名のプロパティにはスルーする。
    if (key === PARENT_PROPERTY_KEY) { continue; }

    makeParentsTraceable(stub[key], stub); // 小スタブを対象に再帰的に関数を呼び出す。
  }
}

export function getStubPathFromRoot(stub: Stub): string[] {
  const parent = stub[PARENT_PROPERTY_KEY];
  if (parent == null) { return []; }
  const parentKey = Object.keys(parent)
    .filter(parentKey => parent[parentKey] === stub)[0]
    .replace(/^\/|\/$/g, '');
  return getStubPathFromRoot(parent).concat(parentKey);
}

export function createStubDebugText(stub: Stub):string {
  const path = getStubPathFromRoot(stub);
  const head = '/' + path.slice(0, -2).join('/') + '/';
  const tail = path[path.length - 1];
  return head + tail + '\n' + ' '.repeat(head.length) + '~'.repeat(tail.length);
}
