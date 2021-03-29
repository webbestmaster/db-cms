"use strict";
/* global Buffer */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = exports.decrypt = exports.encrypt = exports.getHash = exports.getRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const data_base_const_1 = require("../data-base-const");
const algorithm = 'aes-256-ctr';
const randomBytes = crypto_1.default.randomBytes(16);
function getRandomString() {
    return crypto_1.default.randomBytes(16).toString('hex');
}
exports.getRandomString = getRandomString;
function getHash(value) {
    const sha256PasswordHmac = crypto_1.default.createHmac('sha256', data_base_const_1.serverConst.secretKey);
    return sha256PasswordHmac.update(value).digest('hex');
}
exports.getHash = getHash;
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv(algorithm, data_base_const_1.serverConst.secretKey, randomBytes);
    return Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');
}
exports.encrypt = encrypt;
function decrypt(hash) {
    const decipher = crypto_1.default.createDecipheriv(algorithm, data_base_const_1.serverConst.secretKey, Buffer.from(randomBytes.toString('hex'), 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();
}
exports.decrypt = decrypt;
function parseCookie(value) {
    const result = {};
    value
        .split(';')
        .map((keyValue) => keyValue.trim())
        .filter(Boolean)
        .forEach((keyValue) => {
        const [cookieKey = '', cookieValue = ''] = keyValue.split('=');
        result[cookieKey.trim()] = cookieValue.trim();
    });
    return result;
}
exports.parseCookie = parseCookie;
