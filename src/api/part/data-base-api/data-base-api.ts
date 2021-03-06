import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {CrudResponseType, DatabaseCmsConfigType} from '../../../data-base-cms-type';
import {catchError, catchSuccess, getDryRequest, handleDataBaseChange} from '../../api-helper';
import {ApiResultType} from '../../api-type';

import {dataBaseCreate, dataBaseDelete, dataBaseRead, dataBaseReadList, dataBaseUpdate} from './data-base-api-module';

export function addDataBaseApi(app: Application, databaseCmsConfig: DatabaseCmsConfigType): void {
    const apiPrefix = databaseCmsConfig.api.prefix;

    app.post(apiPrefix + apiRouteMap.crud.create, (request: Request, response: Response) => {
        dataBaseCreate(getDryRequest(databaseCmsConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
                handleDataBaseChange(databaseCmsConfig);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.get(apiPrefix + apiRouteMap.crud.read, (request: Request, response: Response) => {
        dataBaseRead(getDryRequest(databaseCmsConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.get(apiPrefix + apiRouteMap.crud.readList, (request: Request, response: Response) => {
        dataBaseReadList(getDryRequest(databaseCmsConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.post(apiPrefix + apiRouteMap.crud.update, (request: Request, response: Response) => {
        dataBaseUpdate(getDryRequest(databaseCmsConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
                handleDataBaseChange(databaseCmsConfig);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });

    app.delete(apiPrefix + apiRouteMap.crud.annihilate, (request: Request, response: Response) => {
        dataBaseDelete(getDryRequest(databaseCmsConfig, request))
            .then((result: ApiResultType<CrudResponseType>) => {
                catchSuccess<CrudResponseType>(result, response);
                handleDataBaseChange(databaseCmsConfig);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });
}
