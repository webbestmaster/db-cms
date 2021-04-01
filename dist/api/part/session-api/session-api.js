"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSessionApi = void 0;
const data_base_const_1 = require("../../../data-base-const");
const api_helper_1 = require("../../api-helper");
const session_api_module_1 = require("./session-api-module");
function addSessionApi(app, databaseCmsConfig) {
    const apiPrefix = databaseCmsConfig.api.prefix;
    app.post(apiPrefix + data_base_const_1.apiRouteMap.auth.login, (request, response) => {
        session_api_module_1.authLogin(api_helper_1.getDryRequest(databaseCmsConfig, request), response)
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
    app.get(apiPrefix + data_base_const_1.apiRouteMap.auth.logout, (request, response) => {
        session_api_module_1.authLogout(response)
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
    app.get(apiPrefix + data_base_const_1.apiRouteMap.auth.logoutAll, (request, response) => {
        session_api_module_1.authLogoutAll(api_helper_1.getDryRequest(databaseCmsConfig, request), response)
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
}
exports.addSessionApi = addSessionApi;
