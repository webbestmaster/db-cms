import {MongoClient, Db, Collection, MongoError} from 'mongodb';
import {Application, Request, Response} from 'express';

import {getAdminBySession, getSessionData} from '../../util/session';
import {log} from '../../util/log';
import {CrudResponseType, DatabaseCmsServerConfigType, ModelConfigType} from '../../data-base-cms-type';
import {getMapFromObject} from '../../util/object';
import {findInArray} from '../../util/array';
import {getIsValid} from '../../util/schema';

import {DefinedRequestDataType, UrlParametersType} from './data-base-api-type';
import {defaultUrlParameters} from './data-base-api-const';

export function defineRequestData(
    databaseCmsServerConfig: DatabaseCmsServerConfigType,
    request: Request
): DefinedRequestDataType | null {
    const sessionData = getSessionData(request);

    log('[DbCmsServer] sessionData:', sessionData);

    const admin = getAdminBySession(databaseCmsServerConfig, sessionData);

    if (!admin) {
        return null;
    }

    const {modelId, instanceId} = getMapFromObject<UrlParametersType>(request.params || {}, defaultUrlParameters);

    const modelConfig = findInArray<ModelConfigType>(databaseCmsServerConfig.modelList, {id: modelId});

    if (!modelConfig) {
        return null;
    }

    const data = request.body;
    const {schema} = modelConfig;

    if (!getIsValid(data, schema)) {
        return null;
    }

    return {
        modelConfig,
        urlParameters: {
            modelId,
            instanceId,
        },
        data,
    };
}
