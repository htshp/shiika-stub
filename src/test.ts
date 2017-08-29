import { makeParentsTraceable, Stub, getStubPathFromRoot, createStubDebugText } from './stub';

const x = {
  'unko/manko': {
    GET: [],
  },
};

const stub: Stub = {
  '/api/v2': {
    users: {
      GET: [],
      ':id': {
        GET: {},

      },
      auijhgigi: x,
    },
  },
};

makeParentsTraceable(stub);

console.log(createStubDebugText(x));
