// test/test.ts
import * as assert from 'assert';

describe('Array#join', () => {
  it('joins all elements into a string with separator', () => {
    assert(['a', 'b', 'c'].join(':') === 'a:b:c');
  });
});
