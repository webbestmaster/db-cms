import {Application, Request, Response} from 'express';

import {AdminType, DatabaseCmsServerConfigType} from '../data-base-cms-type';
import {serverConst} from '../data-base-const';

import {decrypt, encrypt, getRandomString, parseCookie} from './string';
import {log, logError} from './log';

export type SessionDataType = {
    date: number;
    id: string;
    login: string;
    hash: string;
};

export function setSessionCookie(response: Response, admin: AdminType): void {
    const sessionData: SessionDataType = {
        date: Date.now(),
        id: getRandomString(),
        login: admin.login,
        hash: admin.hash,
    };

    response.cookie(serverConst.session.cookieKey, encrypt(JSON.stringify(sessionData)), {
        httpOnly: true,
        secure: true,
    });
}

export function removeSessionCookie(response: Response): void {
    response.cookie(serverConst.session.cookieKey, '', {httpOnly: true, secure: true});
}

// eslint-disable-next-line complexity
export function getSessionData(request: Request): SessionDataType | null {
    const parsedCookie = parseCookie(String(request.headers.cookie || ''));

    const sessionCookie = parsedCookie[serverConst.session.cookieKey] || '';

    try {
        const sessionData = JSON.parse(decrypt(sessionCookie));

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
        logError('getSessionData can not parse session');
    }

    return null;
}

export function isLogIn(databaseCmsServerConfig: DatabaseCmsServerConfigType, sessionData: SessionDataType): boolean {
    const {login, hash} = sessionData;

    const admin: AdminType | null
        = databaseCmsServerConfig.adminList.find((definedAdmin: AdminType): boolean => {
            return definedAdmin.login === login && definedAdmin.hash === hash;
        }) || null;

    return Boolean(admin);
}
