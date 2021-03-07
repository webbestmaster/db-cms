export function catchError(error: Error): Error {
    console.warn('Catch a error in promise!');
    console.error(error);
    return error;
}

export type PromiseResolveType<Result> = (result: Result) => unknown;
