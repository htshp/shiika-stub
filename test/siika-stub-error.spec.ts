import { SiikaStubError } from './../src/siika-stub-error';
import * as assert from 'assert';

describe('siika-stub-error.spec.ts - SiikaStubError', () => {
  it('Normal test', () => {
    assert.throws(
      () => {
        throw new SiikaStubError('OMG!!');
      },
      SiikaStubError,
      'SiikaStubError',
    );
  });
});
