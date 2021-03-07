/* global fetch, Response */

import {LoginDataType, LoginResultType, LogoutResultType} from './auth-type';

import {authApiUrl} from './auth-const';

export function login(authorizationData: LoginDataType): Promise<LoginResultType | Error> {
    return fetch(authApiUrl.login, {
        method: 'post',
        body: JSON.stringify(authorizationData),
    }).then(
        (rawResponse: Response): Promise<LoginResultType> => {
            if (rawResponse.ok) {
                return rawResponse.json();
            }

            throw new Error('[ERROR]: Can not login.');
        },
    );
}

export function logout(): Promise<LogoutResultType | Error> {
    return fetch(authApiUrl.logout, {credentials: 'include'}).then(
        (rawResponse: Response): Promise<LogoutResultType> => {
            if (rawResponse.ok) {
                return rawResponse.json();
            }

            throw new Error('[ERROR]: Can not logout.');
        },
    );
}
