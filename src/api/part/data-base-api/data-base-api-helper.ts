import {Request} from 'express';

import {getAdminBySession, getSessionData} from '../session-api/session-api-helper';
import {log} from '../../../util/log';
import {DatabaseCmsServerConfigType, ModelConfigType} from '../../../data-base-cms-type';
import {getMapFromObject} from '../../../util/object';
import {findInArray} from '../../../util/array';
import {getIsValid} from '../../../util/schema';

import {DefinedRequestDataType, UrlParametersType} from './data-base-api-type';
import {defaultUrlParameters} from './data-base-api-const';

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

    const {modelId, instanceId} = getMapFromObject<UrlParametersType>(request.params || {}, defaultUrlParameters);

    log('[defineRequestData] modelId, instanceId:', modelId, instanceId);

    const modelConfig = findInArray<ModelConfigType>(databaseCmsServerConfig.modelList, {id: modelId});

    if (!modelConfig) {
        return null;
    }

    log('[defineRequestData] modelConfig:', modelId, instanceId);

    return {
        modelConfig,
        urlParameters: {
            modelId,
            instanceId,
        },
        urlQueryParameters: null,
        data: request.body,
    };
}
