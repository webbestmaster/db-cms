import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {AdminType, AuthResponseType, DatabaseCmsServerConfigType} from '../../../data-base-cms-type';
import {getRandomString} from '../../../util/string';
import {findInArray} from '../../../util/array';

import {getAdminBySession, getSessionData, removeSessionCookie, setSessionCookie} from './session-api-helper';

export function addSessionApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.auth.login, (request: Request, response: Response) => {
        const {login, password} = request.body;
        // const sessionData = getSessionData(request);

        // log('[DbCmsServer] sessionData:', sessionData);

        const admin = findInArray<AdminType>(databaseCmsServerConfig.adminList, {login, password});

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
