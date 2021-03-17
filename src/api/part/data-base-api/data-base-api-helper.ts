import {Request} from 'express';
import {FilterQuery} from 'mongodb';

import {getAdminBySession, getSessionData} from '../session-api/session-api-helper';
import {log} from '../../../util/log';
import {
    DatabaseCmsServerConfigType,
    DocumentType,
    ModelConfigType,
    SortDirectionType,
} from '../../../data-base-cms-type';
import {getMapFromObject} from '../../../util/object';
import {findInArray} from '../../../util/array';

import {DefinedRequestDataType, UrlParametersType, UrlQueryParametersType} from './data-base-api-type';
import {defaultUrlParameters} from './data-base-api-const';

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

export function defineRequestData(
    databaseCmsServerConfig: DatabaseCmsServerConfigType,
    request: Request
): DefinedRequestDataType | null {
    const sessionData = getSessionData(request);

    log('[defineRequestData] sessionData:', sessionData);

    const admin = getAdminBySession(databaseCmsServerConfig, sessionData);

    log('[defineRequestData] admin:', admin);

    if (!admin) {
        return null;
    }

    const urlParameters = getMapFromObject<UrlParametersType>(request.params || {}, defaultUrlParameters);

    const modelConfig = findInArray<ModelConfigType>(databaseCmsServerConfig.modelList, {id: urlParameters.modelId});

    if (!modelConfig) {
        return null;
    }

    console.log(getUrlQueryParameters(request));

    return {
        modelConfig,
        urlParameters,
        urlQueryParameters: getUrlQueryParameters(request),
        data: request.body,
    };
}
