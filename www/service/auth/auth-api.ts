/* global fetch, Response */

import {catchError} from '../util/promise';
import {mainApiHeaders} from '../api-const';

import {
    AuthorizationDataType,
    AuthorizationResultType,
    LogoutResultType,
} from './auth-type';
import {authApiUrl} from './auth-const';

export function authorize(authorizationData: AuthorizationDataType): Promise<AuthorizationResultType | Error> {
    return fetch(authApiUrl.login, {
        method: 'post',
        headers: mainApiHeaders,
        credentials: 'include',
        body: JSON.stringify({
            email: authorizationData.email,
            password: authorizationData.password,
            // eslint-disable-next-line camelcase, id-match
            remember_me: authorizationData.rememberMe,
        }),
    })
        .then(
            (rawResponse: Response): Promise<AuthorizationResultType> => {
                if (rawResponse.ok) {
                    return rawResponse.json();
                }

                // eslint-disable-next-line promise/no-return-wrap
                throw new Error('[ERROR]: Can not login.');
            }
        )
        .then((response: AuthorizationResultType): AuthorizationResultType | Error => {
            return response.result === 'ok' ? response : new Error('[ERROR]: AuthorizationResult is not "ok".');
        })
        .catch(catchError);
}

export function logout(): Promise<LogoutResultType | Error> {
    return fetch(authApiUrl.logout, {credentials: 'include'})
        .then(
            (rawResponse: Response): Promise<LogoutResultType> => {
                if (rawResponse.ok) {
                    return rawResponse.json();
                }

                // eslint-disable-next-line promise/no-return-wrap
                throw new Error('[ERROR]: Can not logout.');
            }
        )
        .then((response: LogoutResultType): LogoutResultType | Error => {
            return response.result === 'ok' ? response : new Error('[ERROR]: LogoutResult is not "ok".');
        })
        .catch(catchError);
}
