const HTTP_METHOD_NAMES = ['GET', 'POST', 'PUT', 'DELETE'];

export function isHttpMethod(s: string): boolean {
  return HTTP_METHOD_NAMES.indexOf(s) >= 0;
}

export function isString(value: any): boolean {
  return typeof (value) === 'string' || value instanceof String;
}

export function getFirstPath(path: string): string | null {
  // TODO: クエリを消す
  const paths = path.split('/');
  if (paths.length < 1) return null;

  return paths[0];
}
