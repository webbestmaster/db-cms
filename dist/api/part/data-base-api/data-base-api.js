import { apiRouteMap } from '../../../data-base-const';
import { catchError, catchSuccess, getDryRequest, handleDataBaseChange } from '../../api-helper';
import { dataBaseCreate, dataBaseDelete, dataBaseRead, dataBaseReadList, dataBaseUpdate } from './data-base-api-module';
export function addDataBaseApi(app, databaseCmsConfig) {
    app.post(apiRouteMap.crud.create, (request, response) => {
        dataBaseCreate(getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            catchSuccess(result, response);
            handleDataBaseChange(databaseCmsConfig);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.get(apiRouteMap.crud.read, (request, response) => {
        dataBaseRead(getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            catchSuccess(result, response);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.get(apiRouteMap.crud.readList, (request, response) => {
        dataBaseReadList(getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            catchSuccess(result, response);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.post(apiRouteMap.crud.update, (request, response) => {
        dataBaseUpdate(getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            catchSuccess(result, response);
            handleDataBaseChange(databaseCmsConfig);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
    app.delete(apiRouteMap.crud.annihilate, (request, response) => {
        dataBaseDelete(getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            catchSuccess(result, response);
            handleDataBaseChange(databaseCmsConfig);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
}
