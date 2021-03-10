export function log(...args: Array<unknown>): void {
    console.log(...['[DbCmsServer]', ...args]);
}

export function logError(...args: Array<unknown>): void {
    console.log(...['[ERROR]:[DbCmsServer]', ...args]);
}
