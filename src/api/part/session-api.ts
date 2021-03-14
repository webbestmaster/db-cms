import {Application, Request, Response} from 'express';

import {apiRouteMap, serverConst} from '../../data-base-const';
import {AdminType, AuthResponseType, DatabaseCmsServerConfigType} from '../../data-base-cms-type';
import {getAdminBySession, getSessionData, removeSessionCookie, setSessionCookie} from '../../util/session';
import {log} from '../../util/log';
import {getRandomString} from '../../util/string';

export function addSessionApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.auth.login, (request: Request, response: Response) => {
        const sessionData = getSessionData(request);

        log('[DbCmsServer] sessionData:', sessionData);

        const admin = getAdminBySession(databaseCmsServerConfig, sessionData);

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

        const admin = getAdminBySession(databaseCmsServerConfig, sessionData);

        if (!admin) {
            response.json(errorLogoutResult);
            return;
        }

        admin.hash = getRandomString();

        response.json(successLogoutResult);
    });
}
