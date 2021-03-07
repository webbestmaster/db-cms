/* global fetch, Response */

import {UserType} from './user-type';
import {userApiUrl} from './user-const';

export function getUser(): Promise<UserType> {
    return fetch(userApiUrl.getUser, {credentials: 'include'}).then((rawResponse: Response) => {
        if (rawResponse.ok) {
            return rawResponse.json();
        }

        throw new Error('[ERROR]: Can not get user.');
    });
}
