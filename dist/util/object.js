"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMapFromObject = exports.isObjectInclude = void 0;
function isObjectInclude(object, query) {
    return Object.keys(query).every((queryKey) => query[queryKey] === object[queryKey]);
}
exports.isObjectInclude = isObjectInclude;
function getMapFromObject(object, keyMap) {
    const newKeyMap = Object.assign({}, keyMap);
    return Object.keys(newKeyMap).reduce((accum, key) => {
        if (typeof newKeyMap[key] === typeof object[key]) {
            newKeyMap[key] = object[key];
        }
        return newKeyMap;
    }, newKeyMap);
}
exports.getMapFromObject = getMapFromObject;
