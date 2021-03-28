import { apiRouteMap } from '../../../data-base-const';
import { catchError, catchSuccess, getDryRequest } from '../../api-helper';
import { authLogin, authLogout, authLogoutAll } from './session-api-module';
export function addSessionApi(app, databaseCmsServerConfig) {
    app.post(apiRouteMap.auth.login, (request, response) => {
        authLogin(getDryRequest(databaseCmsServerConfig, request), response)
            .then((result) => {
            catchSuccess(result, response);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.get(apiRouteMap.auth.logout, (request, response) => {
        authLogout(response)
            .then((result) => {
            catchSuccess(result, response);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.get(apiRouteMap.auth.logoutAll, (request, response) => {
        authLogoutAll(getDryRequest(databaseCmsServerConfig, request), response)
            .then((result) => {
            catchSuccess(result, response);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
}
