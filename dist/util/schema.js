"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsValid = void 0;
const jsonschema_1 = require("jsonschema");
const validator = new jsonschema_1.Validator();
function getIsValid(data, schema) {
    return validator.validate(data, Object.assign(Object.assign({}, schema), { additionalProperties: false }), { allowUnknownAttributes: false }).valid;
}
exports.getIsValid = getIsValid;
