import {Request} from 'express';

import {getAdminBySession, getSessionData} from '../session-api/session-api-helper';
import {log} from '../../../util/log';
import {DatabaseCmsServerConfigType, ModelConfigType, SortDirectionType} from '../../../data-base-cms-type';
import {getMapFromObject} from '../../../util/object';
import {findInArray} from '../../../util/array';
import {getIsValid} from '../../../util/schema';

import {DefinedRequestDataType, UrlParametersType, UrlQueryParametersType} from './data-base-api-type';
import {defaultUrlParameters} from './data-base-api-const';

function getUrlQueryParameters(request: Request): UrlQueryParametersType {
    let sort: Record<string, SortDirectionType> = {};

    const {query} = request;

    if (!query) {
        return {sort};
    }

    const querySort = query.sort || {};

    Object.keys(querySort).forEach((querySortKey: string) => {
        const sortValue = Number.parseInt(querySort[querySortKey], 10);

        if (sortValue === -1 || sortValue === 1) {
            sort = {...sort, [querySortKey]: sortValue};
        }
    });

    return {
        sort,
    };
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
