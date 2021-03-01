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

export function addSessionApi(app: Application): void {
    app.get(apiRouteMap.auth.login, async (request: Request, response: Response) => {
        const {login, password} = request.body;

        // const session = getSession(request);

        response.cookie('cookieName', 'cookieValue', {httpOnly: true, secure: true});

        response.json({isSuccessful: true, errorList: []});
    });
}
