import {Request, Response} from 'express';

import {logError} from '../util/log';
import {AdminType, DatabaseCmsServerConfigType} from '../data-base-cms-type';

import {ApiResultType, DryRequestType} from './api-type';
import {SessionDataType} from './part/session-api/session-api-type';
import {getAdminBySession, getSessionData} from './part/session-api/session-api-helper';

export function getDryRequest(databaseCmsServerConfig: DatabaseCmsServerConfigType, request: Request): DryRequestType {
    const body: Record<string, unknown> = request.body || {};
    const sessionData: SessionDataType | null = getSessionData(request);
    const admin: AdminType | null = getAdminBySession(databaseCmsServerConfig, sessionData);

    return {body, sessionData, admin};
}

export function catchSuccess<DataType>(result: ApiResultType<DataType>, response: Response): void {
    response.status(result.statusCode).json(result.data);
}

export function catchError(error: Error, response: Response): void {
    logError(error.message);

    response.status(500).end();
}
