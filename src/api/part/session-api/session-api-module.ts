import {Application, Request, Response} from 'express';

import {ApiResultType, DryRequestType} from '../../api-type';
import {AdminType, AuthResponseType, DatabaseCmsServerConfigType} from '../../../data-base-cms-type';
import {findInArray} from '../../../util/array';

import {setSessionCookie} from './session-api-helper';

export async function authLogin(
    databaseCmsServerConfig: DatabaseCmsServerConfigType,
    dryRequest: DryRequestType,
    response: Response
): Promise<ApiResultType<AuthResponseType>> {
    const {body} = dryRequest;
    const {login, password} = body;

    const admin = findInArray<AdminType>(databaseCmsServerConfig.adminList, {login, password});

    if (!admin) {
        return {
            statusCode: 404,
            data: {user: null, isSuccess: false},
        };
    }

    setSessionCookie(response, admin);

    return {
        statusCode: 200,
        data: {
            user: {login: admin.login},
            isSuccess: true,
        },
    };
}
