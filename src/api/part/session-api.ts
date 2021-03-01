/* global process */

import path from 'path';

import {Application, Request, Response} from 'express';

import {pathToDist, pathToStaticFileFolder} from '../../../webpack/config';
import {appRoute} from '../../../www/app-route';
import {apiRouteMap} from '../../data-base-const';

const CWD = process.cwd();

export type UserSessionType = {
    login: string;
    destroy: (callBack?: unknown) => unknown;
};

/*

import crypto from 'crypto';

export type UserLoginPasswordType = {login: string, password: string};

export async function getUserByLogin(login: string): Promise<MongoUserType | null> {
    const collection = await getCollection<MongoUserType>(dataBaseConst.name, dataBaseConst.collection.user);

    if (isError(collection)) {
        throw new Error(`Can not get collection: ${dataBaseConst.collection.user}`);
    }

    return collection.findOne({login});
}

export function getPasswordSha256(text: string): string {
    const sha256PasswordHmac = crypto.createHmac('sha256', passwordKey);

    return sha256PasswordHmac.update(text).digest('hex');
}
*/

export function addSessionApi(app: Application): void {
    app.get(apiRouteMap.auth.login, async (request: Request, response: Response) => {
        const {login, password} = request.body;

        // const session = getSession(request);

        response.cookie('cookieName', 'cookieValue', {httpOnly: true, secure: true});

        response.json({isSuccessful: true, errorList: []});
    });
}
