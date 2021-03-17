import {MongoClient, Db, Collection, MongoError} from 'mongodb';
import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {CrudResponseType, DatabaseCmsServerConfigType, DocumentType} from '../../../data-base-cms-type';
import {getCollection} from '../../../util/data-base';
import {log} from '../../../util/log';
import {getIsValid} from '../../../util/schema';

import {defineRequestData} from './data-base-api-helper';
import {dataBaseErrorResult, defaultDocumentSort} from './data-base-api-const';

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
                return (
                    collection
                        // @ts-ignore
                        .insertOne({...data})
                );
            })
            .then(() => {
                const successResult: CrudResponseType = {isSuccess: true, data, size: 1};

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
                    return collection.findOne({[keyId]: instanceId});
                }
            )
            .then((instance: DocumentType | null) => {
                if (!instance) {
                    response.json(dataBaseErrorResult);
                    return;
                }

                const successResult: CrudResponseType = {isSuccess: true, data: instance, size: 1};

                response.json(successResult);
            })
            .catch(() => {
                response.json(dataBaseErrorResult);
            });
    });

    app.get(apiRouteMap.crud.readList, (request: Request, response: Response) => {
        const requestData = defineRequestData(databaseCmsServerConfig, request);

        if (!requestData) {
            response.json(dataBaseErrorResult);
            return;
        }

        const {urlParameters, modelConfig, urlQueryParameters} = requestData;
        const {keyId} = modelConfig;
        const {sort} = urlQueryParameters;
        const {modelId, instanceId, pageIndex, pageSize} = urlParameters;
        const pageIndexInt = Number.parseInt(pageIndex, 10);
        const pageSizeInt = Number.parseInt(pageSize, 10);

        getCollection<DocumentType>(databaseCmsServerConfig, modelId)
            .then(
                (collection: Collection<DocumentType>): Promise<[Array<DocumentType>, number]> => {
                    const cursor = collection
                        .find({})
                        .sort(sort)
                        .skip(pageSizeInt * pageIndexInt)
                        .limit(pageSizeInt);

                    return Promise.all<Array<DocumentType>, number>([cursor.toArray(), cursor.count(false)]);

                    /*
                    collection
                        .find({$or: [...getSearchParameters(request)]})
                        .sort({[sortParameter]: sortDirection}) +
                        .skip(pageSize * pageIndex) +
                        .limit(pageSize) +
                        .toArray((error: ?Error, documentList: ?Array<MongoDocumentType>) => {
                        if (error || !Array.isArray(documentList)) {
                            response.status(400);
                            response.json({
                                isSuccessful: false,
                                errorList: [documentApiRouteMap.getDocumentList + ': Can not read document collection!'],
                            });
                            return;
                        }

                        response.json(documentList);
                    });
*/

                    /*
                    collection
                        // $FlowFixMe
                        .find({$or: [...getSearchParameters(request)], isActive: true})
                        .toArray((error: ?Error, documentList: ?Array<MongoDocumentType>) => {
                        if (error || !Array.isArray(documentList)) {
                            response.status(400);
                            response.json([]);
                            return;
                        }

                        response.json(documentList);
                    });
*/

                    // return collection.findOne({[keyId]: instanceId});
                }
            )
            .then((collectedData: [Array<DocumentType>, number]) => {
                const [instanceList, count] = collectedData;

                const successResult: CrudResponseType = {isSuccess: true, data: instanceList, size: count};

                response.json(successResult);
            })
            .catch(() => {
                response.json(dataBaseErrorResult);
            });
    });
}
