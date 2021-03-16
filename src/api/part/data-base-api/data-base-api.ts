import {MongoClient, Db, Collection, MongoError} from 'mongodb';
import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {CrudResponseType, DatabaseCmsServerConfigType, DocumentType} from '../../../data-base-cms-type';
import {getCollection} from '../../../util/data-base';
import {log} from '../../../util/log';
import {getIsValid} from '../../../util/schema';

import {defineRequestData} from './data-base-api-helper';
import {dataBaseErrorResult} from './data-base-api-const';

export function addDataBaseApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.crud.create, (request: Request, response: Response) => {
        const requestData = defineRequestData(databaseCmsServerConfig, request);

        if (!requestData) {
            response.json(dataBaseErrorResult);
            return;
        }

        const {urlParameters, data, modelConfig} = requestData;
        const {modelId} = urlParameters;
        const {schema} = modelConfig;

        if (!getIsValid(data, schema)) {
            response.json(dataBaseErrorResult);
            return;
        }

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

    app.get(apiRouteMap.crud.read, (request: Request, response: Response) => {
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

                const {_id, ...clearData} = instance;

                const successResult: CrudResponseType = {isSuccess: true, data: clearData};

                response.json(successResult);
            })
            .catch(() => {
                response.json(dataBaseErrorResult);
            });
    });
}
