import {Application, Request, Response} from 'express';

import {AdminType} from '../data-base-cms-type';
import {serverConst} from '../data-base-const';

import {decrypt, encrypt, getRandomString, parseCookie} from './string';

export type SessionDataType = {
    date: number;
    id: string;
    login: string;
};

export function setSessionCookie(response: Response, admin: AdminType): SessionDataType {
    const sessionData: SessionDataType = {
        date: Date.now(),
        id: getRandomString(),
        login: admin.login,
    };

    response.cookie(serverConst.session.cookieKey, encrypt(JSON.stringify(sessionData)), {
        httpOnly: true,
        secure: true,
    });

    return sessionData;
}

// eslint-disable-next-line complexity
export function getSessionData(request: Request): SessionDataType | null {
    const parsedCookie = parseCookie(String(request.headers.cookie || ''));

    const sessionCookie = parsedCookie[serverConst.session.cookieKey] || '';

    try {
        const sessionData = JSON.parse(decrypt(sessionCookie));

        const {date, id, login} = sessionData;

        if (typeof date === 'number' && typeof id === 'string' && typeof login === 'string') {
            return {date, id, login};
        }

        return null;
    } catch {
        return null;
    }
}
