/* global Buffer */
import crypto from 'crypto';
import { serverConst } from '../data-base-const';
const algorithm = 'aes-256-ctr';
const randomBytes = crypto.randomBytes(16);
export function getRandomString() {
    return crypto.randomBytes(16).toString('hex');
}
export function getHash(value) {
    const sha256PasswordHmac = crypto.createHmac('sha256', serverConst.secretKey);
    return sha256PasswordHmac.update(value).digest('hex');
}
export function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, serverConst.secretKey, randomBytes);
    return Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');
}
export function decrypt(hash) {
    const decipher = crypto.createDecipheriv(algorithm, serverConst.secretKey, Buffer.from(randomBytes.toString('hex'), 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();
}
export function parseCookie(value) {
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
