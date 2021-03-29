"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.log = void 0;
function log(...args) {
    console.log(...['[DbCmsServer]:[LOG]:', ...args]);
}
exports.log = log;
function logError(...args) {
    console.log(...['[DbCmsServer]:[ERROR]:', ...args]);
}
exports.logError = logError;
