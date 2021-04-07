import {Response} from 'express';

import {ApiResultType, DryRequestType} from '../../api-type';
import {AdminType, AuthResponseType} from '../../../data-base-cms-type';
import {findInArray} from '../../../util/array';
import {getRandomString} from '../../../util/string';

import {removeSessionCookie, setSessionCookie} from './session-api-helper';

export async function authLogin(
    dryRequest: DryRequestType,
    response: Response
): Promise<ApiResultType<AuthResponseType>> {
    const {body, databaseCmsConfig} = dryRequest;
    const {login, password} = body;

    const admin = findInArray<AdminType>(databaseCmsConfig.adminList, {login, password});

    if (!admin) {
        return {
            statusCode: 404,
            data: {user: null},
        };
    }

    setSessionCookie(response, admin);

    return {
        statusCode: 200,
        data: {
            user: {login: admin.login},
        },
    };
}

export async function authLogout(response: Response): Promise<ApiResultType<AuthResponseType>> {
    removeSessionCookie(response);

    return {
        statusCode: 200,
        data: {user: null},
    };
}

export async function authLogoutAll(
    dryRequest: DryRequestType,
    response: Response
): Promise<ApiResultType<AuthResponseType>> {
    const {admin} = dryRequest;

    if (!admin) {
        return {
            statusCode: 404,
            data: {user: null},
        };
    }

    removeSessionCookie(response);

    admin.hash = getRandomString();

    return {
        statusCode: 200,
        data: {user: null},
    };
}

export async function authGetUser(dryRequest: DryRequestType): Promise<ApiResultType<AuthResponseType>> {
    const {admin} = dryRequest;

    if (!admin) {
        return {
            statusCode: 401,
            data: {user: null},
        };
    }

    const {login} = admin;

    return {
        statusCode: 200,
        data: {user: {login}},
    };
}
