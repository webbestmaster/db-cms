"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByValueEnsure = exports.findByValue = exports.findManyInArray = exports.findInArrayEnsure = exports.findInArray = exports.arrayMove = void 0;
const object_1 = require("./object");
function arrayMove(list, fromIndex, toIndex) {
    const item = list[fromIndex];
    list.splice(fromIndex, 1);
    list.splice(toIndex, 0, item);
}
exports.arrayMove = arrayMove;
function findInArray(list, query) {
    return list.find((item) => object_1.isObjectInclude(item, query)) || null;
}
exports.findInArray = findInArray;
function findInArrayEnsure(list, query, defaultValue) {
    return findInArray(list, query) || defaultValue;
}
exports.findInArrayEnsure = findInArrayEnsure;
function findManyInArray(list, query) {
    return list.filter((item) => object_1.isObjectInclude(item, query));
}
exports.findManyInArray = findManyInArray;
function findByValue(list, value) {
    return list.find((item) => item === value) || null;
}
exports.findByValue = findByValue;
function findByValueEnsure(list, value, defaultValue) {
    return findByValue(list, value) || defaultValue;
}
exports.findByValueEnsure = findByValueEnsure;
