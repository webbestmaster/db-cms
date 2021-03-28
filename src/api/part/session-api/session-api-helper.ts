import {Request, Response} from 'express';

import {AdminType, DatabaseCmsConfigType} from '../../../data-base-cms-type';
import {serverConst} from '../../../data-base-const';
import {decrypt, encrypt, getRandomString, parseCookie} from '../../../util/string';
import {log} from '../../../util/log';

import {SessionDataType} from './session-api-type';

export function setSessionCookie(response: Response, admin: AdminType): void {
    const sessionData: SessionDataType = {
        date: Date.now(),
        id: getRandomString(),
        login: admin.login,
        hash: admin.hash,
    };

    response.cookie(serverConst.session.sessionKey, encrypt(JSON.stringify(sessionData)), {
        httpOnly: true,
        secure: true,
    });
}

export function removeSessionCookie(response: Response): void {
    response.cookie(serverConst.session.sessionKey, '', {httpOnly: true, secure: true});
}

// eslint-disable-next-line complexity
export function getSessionData(request: Request): SessionDataType | null {
    const parsedCookie = parseCookie(String(request.headers.cookie || ''));

    const sessionCookie = parsedCookie[serverConst.session.sessionKey] || '';

    try {
        const sessionData = JSON.parse(decrypt(sessionCookie)) || {};

        const {date, id, login, hash} = sessionData;

        if (
            typeof date === 'number'
            && typeof id === 'string'
            && typeof login === 'string'
            && typeof hash === 'string'
        ) {
            return {date, id, login, hash};
        }
    } catch {
        log('getSessionData can not parse session');
    }

    return null;
}

// eslint-disable-next-line complexity
export function getAdminBySession(
    databaseCmsConfig: DatabaseCmsConfigType,
    sessionData: SessionDataType | null
): AdminType | null {
    if (!sessionData) {
        return null;
    }

    const {login, hash} = sessionData;
    const {adminList} = databaseCmsConfig;

    // eslint-disable-next-line no-loops/no-loops
    for (const admin of adminList) {
        if (admin.hash === hash && admin.login === login) {
            return admin;
        }
    }

    return null;
}

// eslint-disable-next-line complexity
export function getAdminByApiKey(databaseCmsConfig: DatabaseCmsConfigType, request: Request): AdminType | null {
    const apiKey = String(request.headers[serverConst.api.apiHeaderKey] || '');

    if (apiKey.trim() === '') {
        return null;
    }

    const {adminList} = databaseCmsConfig;

    // eslint-disable-next-line no-loops/no-loops
    for (const admin of adminList) {
        if (admin.apiKey === apiKey) {
            return admin;
        }
    }

    return null;
}
