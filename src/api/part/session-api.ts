import {Application, Request, Response} from 'express';

import {apiRouteMap, serverConst} from '../../data-base-const';
import {AdminType, AuthResponseType, DatabaseCmsServerConfigType} from '../../data-base-cms-type';
import {getSessionData, setSessionCookie} from '../../util/session';

export function addSessionApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.auth.login, async (request: Request, response: Response) => {
        const {login, password} = request.body;

        const sessionData = getSessionData(request);

        console.log('[DbCmsServer] sessionData:', sessionData);

        const admin: AdminType | null
            = databaseCmsServerConfig.adminList.find((definedAdmin: AdminType): boolean => {
                return definedAdmin.login === login && definedAdmin.password === password;
            }) || null;

        if (!admin) {
            const errorResult: AuthResponseType = {
                user: null,
                isSuccess: false,
            };

            response.json(errorResult);
            return;
        }

        setSessionCookie(response, admin);

        const successResult: AuthResponseType = {
            user: {login: admin.login},
            isSuccess: true,
        };

        response.json(successResult);
    });
}
