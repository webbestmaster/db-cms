"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFileApi = void 0;
const data_base_const_1 = require("../../../data-base-const");
const api_helper_1 = require("../../api-helper");
const file_api_module_1 = require("./file-api-module");
function addFileApi(app, databaseCmsConfig) {
    app.post(data_base_const_1.apiRouteMap.file.upload, (request, response) => {
        file_api_module_1.fileApiUpload(api_helper_1.getDryRequest(databaseCmsConfig, request), request)
            .then((result) => {
            api_helper_1.catchSuccess(result, response);
        })
            .catch((error) => {
            api_helper_1.catchError(error, response);
        });
    });
}
exports.addFileApi = addFileApi;
