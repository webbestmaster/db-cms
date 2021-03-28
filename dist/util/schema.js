import { Validator } from 'jsonschema';
const validator = new Validator();
export function getIsValid(data, schema) {
    return validator.validate(data, Object.assign(Object.assign({}, schema), { additionalProperties: false }), { allowUnknownAttributes: false }).valid;
}
