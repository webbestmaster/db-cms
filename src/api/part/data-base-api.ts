import {MongoClient, Db, Collection, MongoError} from 'mongodb';
import {Application, Request, Response} from 'express';

import {apiRouteMap, serverConst} from '../../data-base-const';
import {CrudResponseType, DatabaseCmsServerConfigType, DocumentType, ModelConfigType} from '../../data-base-cms-type';
import {getAdminBySession, getSessionData, removeSessionCookie, setSessionCookie} from '../../util/session';
import {log} from '../../util/log';
import {getMapFromObject} from '../../util/object';
import {findInArray} from '../../util/array';
import {getCollection} from '../../util/data-base';
import {getIsValid} from '../../util/schema';

import {defineRequestData} from './data-base-api-helper';
import {dataBaseErrorResult} from './data-base-api-const';

export function addDataBaseApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.crud.create, (request: Request, response: Response) => {
        const requestData = defineRequestData(databaseCmsServerConfig, request);

        if (!requestData) {
            response.json(dataBaseErrorResult);
            return;
        }

        const {urlParameters, data} = requestData;
        const {instanceId, modelId} = urlParameters;

        getCollection<DocumentType>(databaseCmsServerConfig, modelId)
            // @ts-ignore
            .then((collection: Collection<DocumentType>) => collection.insert({...data}))
            .then(() => {
                const successResult: CrudResponseType = {isSuccess: true, data};

                response.json(successResult);
            })
            .catch(() => {
                response.json(dataBaseErrorResult);
            });
    });

    app.post(apiRouteMap.crud.read, (request: Request, response: Response) => {
        const requestData = defineRequestData(databaseCmsServerConfig, request);

        if (!requestData) {
            response.json(dataBaseErrorResult);
            return;
        }

        const {urlParameters, data} = requestData;
        const {instanceId, modelId} = urlParameters;

        getCollection<DocumentType>(databaseCmsServerConfig, modelId)
            // @ts-ignore
            .then((collection: Collection<DocumentType>) => collection.insert({...data}))
            .then(() => {
                const successResult: CrudResponseType = {isSuccess: true, data};

                response.json(successResult);
            })
            .catch(() => {
                response.json(dataBaseErrorResult);
            });
    });
}
