import {MongoClient, Db, Collection, MongoError, ObjectId} from 'mongodb';
import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {
    AuthResponseType,
    CrudResponseType,
    DatabaseCmsServerConfigType,
    DocumentType,
} from '../../../data-base-cms-type';
import {getCollection} from '../../../util/data-base';
import {log} from '../../../util/log';
import {getIsValid} from '../../../util/schema';

import {catchError, catchSuccess, getDryRequest} from '../../api-helper';

import {ApiResultType} from '../../api-type';

import {dataBaseCreate, dataBaseRead, dataBaseReadList} from './data-base-api-module';

export function addDataBaseApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.crud.create, (request: Request, response: Response) => {
        dataBaseCreate(getDryRequest(databaseCmsServerConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.get(apiRouteMap.crud.read, (request: Request, response: Response) => {
        dataBaseRead(getDryRequest(databaseCmsServerConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.get(apiRouteMap.crud.readList, (request: Request, response: Response) => {
        dataBaseReadList(getDryRequest(databaseCmsServerConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });
}
