import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {CrudResponseType, DatabaseCmsServerConfigType} from '../../../data-base-cms-type';
import {catchError, catchSuccess, getDryRequest, handleDataBaseChange} from '../../api-helper';
import {ApiResultType} from '../../api-type';

import {dataBaseCreate, dataBaseDelete, dataBaseRead, dataBaseReadList, dataBaseUpdate} from './data-base-api-module';

export function addDataBaseApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.crud.create, (request: Request, response: Response) => {
        dataBaseCreate(getDryRequest(databaseCmsServerConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
                handleDataBaseChange(databaseCmsServerConfig);
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

    app.post(apiRouteMap.crud.update, (request: Request, response: Response) => {
        dataBaseUpdate(getDryRequest(databaseCmsServerConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
                handleDataBaseChange(databaseCmsServerConfig);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.delete(apiRouteMap.crud.annihilate, (request: Request, response: Response) => {
        dataBaseDelete(getDryRequest(databaseCmsServerConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
                handleDataBaseChange(databaseCmsServerConfig);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });
}
