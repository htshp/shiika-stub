import * as url from 'url';

// Strings handled by siika-stub as HTTP method.
const HTTP_METHOD_NAMES = ['GET', 'POST', 'PUT', 'DELETE'];

/**
 * Check whether the specified string is an HTTP method.
 * @param s String to be checked.
 */
export function isHttpMethod(s: string): boolean {
  return HTTP_METHOD_NAMES.indexOf(s) >= 0;
}

/**
 * The specified value is determined to be of type string.
 * @param value Value to be checked.
 */
export function isString(value: any): boolean {
  // Is it type 'string' or type 'String'?
  return typeof (value) === 'string' || value instanceof String;
}

/**
 * Divide the path into individual paths and queries.
 * @param pathPath To be split.
 */
export function splitPath(path: string): {
  path: string[],
  query: { [queryName: string]: string; },
} {
  const { pathname, query } = url.parse(path, true);

  const pathArray = pathname
    ? pathname.split('/').filter(x => x !== '') // Remove empty string.
    : [];

  return {
    query,
    path: pathArray,
  };
}

/**
 * The specified value is determined to be of type function.
 * @param value Value to be checked.
 */
export function isFunction(value: any): boolean {
  // Is it type 'function'?
  return typeof (value) === 'function';
}

