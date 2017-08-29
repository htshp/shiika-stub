import { SiikaStubError } from './siika-stub-error';
import { Stub, StubResponse } from './stub';
import { isHttpMethod, isString } from './util';

export interface StubResponseWithParams {
  params: { [paramName: string]: string };
  res: StubResponse;
}

export function findStubResponse(path: string[], stub: Stub, method: string, rootStub?: Stub)
  : StubResponseWithParams | null {
  // returnstub responce ifpath is empty
  if (path.length === 0) { return { params: {}, res: stub[method] }; }

  // if ommit rootStub, rootStub is stub
  if (rootStub) { rootStub = stub; }

  const firstPath = path[0];
  for (const stubPath of Object.keys(stub)) {
    // ignore if stub is http method
    if (isHttpMethod(stubPath)) continue;

    // if stubPath type is string
    if (isString(stubPath)) {
      if (stubPath[0] === ':') {
        // any match
        const res = findStubResponse(path, stub[stubPath], method);
        if (res) {
          res.params[stubPath.slice(1)] = firstPath;
        }
        return res;
      } else {
        // perfect match
        if (firstPath === stubPath) {
          return findStubResponse(
            path.slice(1),
            stub[stubPath],
            method);
        }
      }
    }

    // error stubPath type is out of domain
    throw new SiikaStubError('stubPath type is out of domamin');
  }

  return null;
}
