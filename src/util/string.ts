function getHashFree(value: string): string {
    let result = 0;
    const stringLength = value.length;

    // eslint-disable-next-line no-loops/no-loops
    for (let index = 0; index < stringLength; index += 1) {
        result = Math.trunc(Math.imul(31, result) + value.charCodeAt(index));
    }

    return result.toString(32);
}

export const getHash = ((): ((value: string) => string) => {
    const hashCache: {[key: string]: string | void} = {};

    return function getHashMemoized(value: string): string {
        const cachedResult = hashCache[value];

        if (cachedResult) {
            console.log('getHash', cachedResult, value);
            return cachedResult;
        }

        // eslint-disable-next-line no-return-assign
        return hashCache[value] = getHashFree(value);
    };
})();
