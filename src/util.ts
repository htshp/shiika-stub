import * as url from 'url';

// siika-stubがHTTPメソッドとして扱う文字列
const HTTP_METHOD_NAMES = ['GET', 'POST', 'PUT', 'DELETE'];

/**
 * 指定した文字列がHTTPメソッドか判定する。
 * @param s 判定対象の文字列
 */
export function isHttpMethod(s: string): boolean {
    return HTTP_METHOD_NAMES.indexOf(s) >= 0;
}

/**
 * 指定した値の方が文字列か判定する。
 * @param value 判定対象の値
 */
export function isString(value: any): boolean {
    return typeof (value) === 'string' // string型か？
        || value instanceof String; // String型(Objectとしてラップされたstring型)か？
}

/**
 * URLのパス部分を個々のパスとクエリに分割する。
 * @param path 分割対象のパス
 */
export function splitPath(path: string): {
    path: string[],
    query: { [queryName: string]: string }
} {
    // パス部分とクエリ部分に分割する。
    const { pathname, query } = url.parse(path, true);

    return {
        path: pathname ? pathname.split('/') : [],
        query: query
    };
}

/**
 * '/' で区切られたパスから先頭のパスを取り出す。
 * @param path 
 */
// @internal
export function getFirstPath(path: string): string | null {
    // TODO: クエリを消す
    const paths = path.split('/');
    if (paths.length < 1) return null;

    return paths[0];
}
