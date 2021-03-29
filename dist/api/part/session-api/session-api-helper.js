"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminByApiKey = exports.getAdminBySession = exports.getSessionData = exports.removeSessionCookie = exports.setSessionCookie = void 0;
const data_base_const_1 = require("../../../data-base-const");
const string_1 = require("../../../util/string");
const log_1 = require("../../../util/log");
function setSessionCookie(response, admin) {
    const sessionData = {
        date: Date.now(),
        id: string_1.getRandomString(),
        login: admin.login,
        hash: admin.hash,
    };
    response.cookie(data_base_const_1.serverConst.session.sessionKey, string_1.encrypt(JSON.stringify(sessionData)), {
        httpOnly: true,
        secure: true,
    });
}
exports.setSessionCookie = setSessionCookie;
function removeSessionCookie(response) {
    response.cookie(data_base_const_1.serverConst.session.sessionKey, '', { httpOnly: true, secure: true });
}
exports.removeSessionCookie = removeSessionCookie;
// eslint-disable-next-line complexity
function getSessionData(request) {
    const parsedCookie = string_1.parseCookie(String(request.headers.cookie || ''));
    const sessionCookie = parsedCookie[data_base_const_1.serverConst.session.sessionKey] || '';
    try {
        const sessionData = JSON.parse(string_1.decrypt(sessionCookie)) || {};
        const { date, id, login, hash } = sessionData;
        if (typeof date === 'number'
            && typeof id === 'string'
            && typeof login === 'string'
            && typeof hash === 'string') {
            return { date, id, login, hash };
        }
    }
    catch (_a) {
        log_1.log('getSessionData can not parse session');
    }
    return null;
}
exports.getSessionData = getSessionData;
// eslint-disable-next-line complexity
function getAdminBySession(databaseCmsConfig, sessionData) {
    if (!sessionData) {
        return null;
    }
    const { login, hash } = sessionData;
    const { adminList } = databaseCmsConfig;
    // eslint-disable-next-line no-loops/no-loops
    for (const admin of adminList) {
        if (admin.hash === hash && admin.login === login) {
            return admin;
        }
    }
    return null;
}
exports.getAdminBySession = getAdminBySession;
// eslint-disable-next-line complexity
function getAdminByApiKey(databaseCmsConfig, request) {
    const apiKey = String(request.headers[data_base_const_1.serverConst.api.apiHeaderKey] || '');
    if (apiKey.trim() === '') {
        return null;
    }
    const { adminList } = databaseCmsConfig;
    // eslint-disable-next-line no-loops/no-loops
    for (const admin of adminList) {
        if (admin.apiKey === apiKey) {
            return admin;
        }
    }
    return null;
}
exports.getAdminByApiKey = getAdminByApiKey;
