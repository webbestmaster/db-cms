import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {AdminType, AuthResponseType, DatabaseCmsServerConfigType} from '../../../data-base-cms-type';
import {getRandomString} from '../../../util/string';
import {findInArray} from '../../../util/array';

import {catchError, catchSuccess, getDryRequest} from '../../api-helper';

import {ApiResultType} from '../../api-type';

import {getAdminBySession, getSessionData, removeSessionCookie, setSessionCookie} from './session-api-helper';
import {authLogin} from './session-api-module';

export function addSessionApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.auth.login, (request: Request, response: Response) => {
        authLogin(databaseCmsServerConfig, getDryRequest(request), response)
            .then((result: ApiResultType<AuthResponseType>) => {
                catchSuccess<AuthResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
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
