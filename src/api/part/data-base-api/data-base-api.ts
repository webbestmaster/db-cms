import {MongoClient, Db, Collection, MongoError} from 'mongodb';
import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {CrudResponseType, DatabaseCmsServerConfigType, DocumentType} from '../../../data-base-cms-type';
import {getCollection} from '../../../util/data-base';

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
        const {modelId} = urlParameters;

        getCollection<DocumentType>(databaseCmsServerConfig, modelId)
            .then((collection: Collection<DocumentType>): void => {
                // @ts-ignore
                return collection.insert({...data});
            })
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

        const {urlParameters, modelConfig} = requestData;
        const {keyId} = modelConfig;
        const {instanceId, modelId} = urlParameters;

        getCollection<DocumentType>(databaseCmsServerConfig, modelId)
            .then(
                (collection: Collection<DocumentType>): Promise<DocumentType | null> => {
                    // @ts-ignore
                    return collection.findOne({[keyId]: instanceId});
                }
            )
            .then((instance: DocumentType | null) => {
                if (!instance) {
                    response.json(dataBaseErrorResult);
                    return;
                }

                const successResult: CrudResponseType = {isSuccess: true, data: instance};

                response.json(successResult);
            })
            .catch(() => {
                response.json(dataBaseErrorResult);
            });
    });
}
