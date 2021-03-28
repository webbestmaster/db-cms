import { apiRouteMap } from '../../../data-base-const';
import { catchError, catchSuccess, getDryRequest, handleDataBaseChange } from '../../api-helper';
import { dataBaseCreate, dataBaseDelete, dataBaseRead, dataBaseReadList, dataBaseUpdate } from './data-base-api-module';
export function addDataBaseApi(app, databaseCmsServerConfig) {
    app.post(apiRouteMap.crud.create, (request, response) => {
        dataBaseCreate(getDryRequest(databaseCmsServerConfig, request))
            .then((result) => {
            catchSuccess(result, response);
            handleDataBaseChange(databaseCmsServerConfig);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.get(apiRouteMap.crud.read, (request, response) => {
        dataBaseRead(getDryRequest(databaseCmsServerConfig, request))
            .then((result) => {
            catchSuccess(result, response);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.get(apiRouteMap.crud.readList, (request, response) => {
        dataBaseReadList(getDryRequest(databaseCmsServerConfig, request))
            .then((result) => {
            catchSuccess(result, response);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.post(apiRouteMap.crud.update, (request, response) => {
        dataBaseUpdate(getDryRequest(databaseCmsServerConfig, request))
            .then((result) => {
            catchSuccess(result, response);
            handleDataBaseChange(databaseCmsServerConfig);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.delete(apiRouteMap.crud.annihilate, (request, response) => {
        dataBaseDelete(getDryRequest(databaseCmsServerConfig, request))
            .then((result) => {
            catchSuccess(result, response);
            handleDataBaseChange(databaseCmsServerConfig);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
}
