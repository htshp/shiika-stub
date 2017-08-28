// test/test.ts
import * as assert from 'assert';
import { isHttpMethod, isString, splitPath, isFunction } from '../src/util';

describe('util.spec.ts - isHttpMethod', () => {
  it('Normal test', () => {
    assert.ok(isHttpMethod('GET'));
    assert.ok(isHttpMethod('POST'));
    assert.ok(isHttpMethod('PUT'));
    assert.ok(isHttpMethod('DELETE'));
  });
  it('Abnormal test', () => {
    assert.ok(!isHttpMethod('get')); // Lowwer case
    assert.ok(!isHttpMethod('POSR')); // Typo
    assert.ok(!isHttpMethod('LINK')); // Deprecated method
  });
});

describe('util.spec.ts - isString', () => {
  it('Normal test', () => {
    assert.ok(isString(''));
    assert.ok(isString(String()));
  });
  it('Abnormal test', () => {
    assert.ok(!isString(null));
    assert.ok(!isString(undefined));
    assert.ok(!isString(0));
    assert.ok(!isString(0.0));
    assert.ok(!isString(/abc/));
    assert.ok(!isString(true));
    assert.ok(!isString({}));
    assert.ok(!isString([]));
    assert.ok(!isString(() => { }));
  });
});

describe('util.spec.ts - splitPath', () => {
  it('Normal test', () => {
    // empty
    assert.deepEqual(splitPath(''), { path: [], query: {} });

    // with query
    assert.deepEqual(splitPath('/api/v2/users?name=taro&age=24&items=100&items=200'), {
      path: ['api', 'v2', 'users'],
      query: {
        name: 'taro',
        age: '24',
        items: ['100', '200'],
      },
    });

    // with domain
    assert.deepEqual(splitPath('http://test.example/test'), {
      path: ['test'],
      query: {},
    });
  });
});

describe('util.spec.ts - isFunction', () => {
  it('Normal test', () => {
    assert.ok(isFunction(() => { }));
  });
  it('Abnormal test', () => {
    assert.ok(!isFunction(null));
    assert.ok(!isFunction(undefined));
    assert.ok(!isFunction(0));
    assert.ok(!isFunction(0.0));
    assert.ok(!isFunction(/abc/));
    assert.ok(!isFunction(true));
    assert.ok(!isFunction({}));
    assert.ok(!isFunction([]));
    assert.ok(!isFunction(''));
    assert.ok(!isFunction(String()));
  });
});
