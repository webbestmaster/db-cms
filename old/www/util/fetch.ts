/* global fetch, Headers, FormData, Response */

type OptionsType = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // GET, POST, PUT, DELETE, etc. (default: GET)
    mode?: 'cors' | 'no-cors'; // no-cors, cors, same-origin (default: same-origin)
    cache?: 'default'; // default, no-cache, reload, force-cache, only-if-cached (default: default)
    credentials?: 'include' | 'same-origin' | 'omit'; // include, same-origin, omit (default: same-origin)
    // headers?: {
    //     'Access-Control-Allow-Headers'?: '*',
    //     Accept?: 'application/json, text/javascript, */*; q=0.01',
    //     'Content-Type'?: 'application/x-www-form-urlencoded; charset=UTF-8',
    // },
    headers?: Headers | Array<Array<string>>;
    redirect?: 'follow'; // manual, follow, error (default: follow)
    referrer?: 'no-referrer'; // no-referrer, client (default: client)
    body?: FormData | string; // body data type must match "Content-Type" header
};

const promiseCache = {};

export function fetchX<ExpectedResponseType>(url: string, options?: OptionsType): Promise<ExpectedResponseType> {
    const cacheProperty = url + ' - ' + (JSON.stringify(options) || '');

    // const savedPromise = promiseCache[cacheProperty];

    /*
    if (savedPromise) {
        console.info(`[CACHE]: fetchX - url: ${url}, options: ${JSON.stringify(options || {})} - get from cache.`);
        return savedPromise;
    }
*/

    const definedOptions: OptionsType = {
        credentials: 'include',
        ...(options || {}),
    };

    promiseCache[cacheProperty] = fetch(url, definedOptions).then(
        (result: Response): Promise<ExpectedResponseType> => {
            if (result.ok) {
                return result.json();
            }

            // promiseCache[cacheProperty] = null;

            throw new Error(JSON.stringify(result));
        },
    );

    /*
        .catch(
            (error: Error): Error => {
                promiseCache[cacheProperty] = null;

                throw error;
            }
        );
*/

    return promiseCache[cacheProperty];
}
