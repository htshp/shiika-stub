import { SiikaStubError, InvalidPathError } from './../src/siika-stub-error';
import * as assert from 'assert';

describe('siika-stub-error.spec.ts - SiikaStubError', () => {
  it('Normal test', () => {
    assert.throws(
      () => {
        throw new InvalidPathError('OMG!!');
      },
      SiikaStubError,
    );
  });
});

throw new InvalidPathError({ a: 100, b: 200 });
