import {Request, Response} from 'express';

import {logError} from '../util/log';
import {AdminType, DatabaseCmsServerConfigType, DocumentType, ModelConfigType} from '../data-base-cms-type';
import {getMapFromObject} from '../util/object';
import {findInArray} from '../util/array';

import {ApiResultType, DryRequestType} from './api-type';
import {SessionDataType} from './part/session-api/session-api-type';
import {getAdminBySession, getSessionData} from './part/session-api/session-api-helper';
import {UrlParametersType, UrlQueryParametersType} from './part/data-base-api/data-base-api-type';
import {defaultUrlParameters} from './part/data-base-api/data-base-api-const';
import {getUrlQueryParameters} from './part/data-base-api/data-base-api-helper';

export function getDryRequest(databaseCmsServerConfig: DatabaseCmsServerConfigType, request: Request): DryRequestType {
    const body: DocumentType = request.body || {};
    const sessionData: SessionDataType | null = getSessionData(request);
    const admin: AdminType | null = getAdminBySession(databaseCmsServerConfig, sessionData);
    const urlParameters: UrlParametersType = getMapFromObject<UrlParametersType>(
        request.params || {},
        defaultUrlParameters
    );
    const modelConfig: ModelConfigType | null = findInArray<ModelConfigType>(databaseCmsServerConfig.modelList, {
        id: urlParameters.modelId,
    });
    const urlQueryParameters: UrlQueryParametersType = getUrlQueryParameters(request);

    return {body, sessionData, admin, modelConfig, urlParameters, urlQueryParameters};
}

export function catchSuccess<DataType>(result: ApiResultType<DataType>, response: Response): void {
    response.status(result.statusCode).json(result.data);
}

export function catchError(error: Error, response: Response): void {
    logError(error.message);

    response.status(500).end();
}
