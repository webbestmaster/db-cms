"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDataBaseApi = void 0;
const data_base_const_1 = require("../../../data-base-const");
const api_helper_1 = require("../../api-helper");
const data_base_api_module_1 = require("./data-base-api-module");
function addDataBaseApi(app, databaseCmsConfig) {
    const apiPrefix = databaseCmsConfig.api.prefix;
    app.post(apiPrefix + data_base_const_1.apiRouteMap.crud.create, (request, response) => {
        data_base_api_module_1.dataBaseCreate(api_helper_1.getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
            api_helper_1.handleDataBaseChange(databaseCmsConfig);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
    app.get(apiPrefix + data_base_const_1.apiRouteMap.crud.read, (request, response) => {
        data_base_api_module_1.dataBaseRead(api_helper_1.getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
    app.get(apiPrefix + data_base_const_1.apiRouteMap.crud.readList, (request, response) => {
        data_base_api_module_1.dataBaseReadList(api_helper_1.getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
    app.post(apiPrefix + data_base_const_1.apiRouteMap.crud.update, (request, response) => {
        data_base_api_module_1.dataBaseUpdate(api_helper_1.getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
            api_helper_1.handleDataBaseChange(databaseCmsConfig);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
    app.delete(apiPrefix + data_base_const_1.apiRouteMap.crud.annihilate, (request, response) => {
        data_base_api_module_1.dataBaseDelete(api_helper_1.getDryRequest(databaseCmsConfig, request))
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
            api_helper_1.handleDataBaseChange(databaseCmsConfig);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
}
exports.addDataBaseApi = addDataBaseApi;
