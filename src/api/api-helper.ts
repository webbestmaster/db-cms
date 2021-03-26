import {Request, Response} from 'express';
import {FilterQuery} from 'mongodb';

import {log, logError} from '../util/log';
import {
    AdminType,
    DatabaseCmsServerConfigType,
    DocumentType,
    ModelConfigType,
    SortDirectionType,
} from '../data-base-cms-type';
import {getMapFromObject} from '../util/object';
import {findInArray} from '../util/array';

import {ApiResultType, DryRequestType, UrlParametersType, UrlQueryParametersType} from './api-type';
import {SessionDataType} from './part/session-api/session-api-type';
import {getAdminByApiKey, getAdminBySession, getSessionData} from './part/session-api/session-api-helper';
import {defaultUrlParameters} from './api-const';

function getUrlQueryParameters(request: Request): UrlQueryParametersType {
    let sort: Record<string, SortDirectionType> = {};
    let find: FilterQuery<DocumentType> = {};

    const {query} = request;

    if (!query) {
        return {sort, find};
    }

    const querySort = query.sort || {};

    Object.keys(querySort).forEach((querySortKey: string) => {
        const sortValue = Number.parseInt(querySort[querySortKey], 10);

        if (sortValue === -1 || sortValue === 1) {
            sort = {...sort, [querySortKey]: sortValue};
        }
    });

    const queryFind = query.find || {};

    Object.keys(queryFind).forEach((queryFindKey: string) => {
        try {
            find = {...find, [queryFindKey]: JSON.parse(queryFind[queryFindKey])};
        } catch {
            log('can not do JSON.parse(queryFind[queryFindKey]): ', queryFind, queryFindKey);
        }
    });

    return {sort, find};
}

export function getDryRequest(databaseCmsServerConfig: DatabaseCmsServerConfigType, request: Request): DryRequestType {
    const body: DocumentType = request.body || {};
    const sessionData: SessionDataType | null = getSessionData(request);
    const admin: AdminType | null
        = getAdminBySession(databaseCmsServerConfig, sessionData) || getAdminByApiKey(databaseCmsServerConfig, request);
    const urlParameters: UrlParametersType = getMapFromObject<UrlParametersType>(
        request.params || {},
        defaultUrlParameters
    );
    const modelConfig: ModelConfigType | null = findInArray<ModelConfigType>(databaseCmsServerConfig.modelList, {
        id: urlParameters.modelId,
    });
    const urlQueryParameters: UrlQueryParametersType = getUrlQueryParameters(request);

    return {
        body,
        sessionData,
        admin,
        modelConfig,
        urlParameters,
        urlQueryParameters,
        databaseCmsServerConfig,
    };
}

export function catchSuccess<DataType>(result: ApiResultType<DataType>, response: Response): void {
    response.status(result.statusCode).json(result.data);
}

export function catchError(error: Error, response: Response): void {
    logError(error.message);

    response.status(500).end();
}
