import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {AuthResponseType, DatabaseCmsConfigType} from '../../../data-base-cms-type';
import {catchError, catchSuccess, getDryRequest} from '../../api-helper';
import {ApiResultType} from '../../api-type';

import {authLogin, authLogout, authLogoutAll} from './session-api-module';

export function addSessionApi(app: Application, databaseCmsConfig: DatabaseCmsConfigType): void {
    const apiPrefix = databaseCmsConfig.api.prefix;

    app.post(apiPrefix + apiRouteMap.auth.login, (request: Request, response: Response) => {
        authLogin(getDryRequest(databaseCmsConfig, request), response)
            .then((result: ApiResultType<AuthResponseType>) => {
                catchSuccess<AuthResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.get(apiPrefix + apiRouteMap.auth.logout, (request: Request, response: Response) => {
        authLogout(response)
            .then((result: ApiResultType<AuthResponseType>) => {
                catchSuccess<AuthResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.get(apiPrefix + apiRouteMap.auth.logoutAll, (request: Request, response: Response) => {
        authLogoutAll(getDryRequest(databaseCmsConfig, request), response)
            .then((result: ApiResultType<AuthResponseType>) => {
                catchSuccess<AuthResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });
}
