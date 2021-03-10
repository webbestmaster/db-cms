import {Application, Request, Response} from 'express';

import {apiRouteMap, serverConst} from '../../data-base-const';
import {AdminType, AuthResponseType, DatabaseCmsServerConfigType} from '../../data-base-cms-type';
import {getSessionData, removeSessionCookie, setSessionCookie} from '../../util/session';
import {log} from '../../util/log';
import {getRandomString} from '../../util/string';

export function addSessionApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.auth.login, (request: Request, response: Response) => {
        const {login, password} = request.body;

        const sessionData = getSessionData(request);

        log('[DbCmsServer] sessionData:', sessionData);

        const admin: AdminType | null
            = databaseCmsServerConfig.adminList.find((definedAdmin: AdminType): boolean => {
                return definedAdmin.login === login && definedAdmin.password === password;
            }) || null;

        if (!admin) {
            const errorResult: AuthResponseType = {
                user: null,
                isSuccess: false,
            };

            response.json(errorResult);
            return;
        }

        setSessionCookie(response, admin);

        const successResult: AuthResponseType = {
            user: {login: admin.login},
            isSuccess: true,
        };

        response.json(successResult);
    });

    app.get(apiRouteMap.auth.logout, (request: Request, response: Response) => {
        removeSessionCookie(response);

        const successResult: AuthResponseType = {
            user: null,
            isSuccess: true,
        };

        response.json(successResult);
    });

    app.get(apiRouteMap.auth.logoutAll, (request: Request, response: Response) => {
        const sessionData = getSessionData(request);

        const errorLogoutResult: AuthResponseType = {
            user: null,
            isSuccess: false,
        };

        const successLogoutResult: AuthResponseType = {
            user: null,
            isSuccess: true,
        };

        if (!sessionData) {
            response.json(errorLogoutResult);
            return;
        }

        const {login, hash} = sessionData;

        const admin: AdminType | null
            = databaseCmsServerConfig.adminList.find((definedAdmin: AdminType): boolean => {
                return definedAdmin.login === login && definedAdmin.hash === hash;
            }) || null;

        if (!admin) {
            response.json(errorLogoutResult);
            return;
        }

        admin.hash = getRandomString();

        response.json(successLogoutResult);
    });
}
