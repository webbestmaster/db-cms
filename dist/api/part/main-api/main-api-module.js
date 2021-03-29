"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataMainApiConfig = void 0;
const main_api_const_1 = require("./main-api-const");
function dataMainApiConfig(dryRequest) {
    const { databaseCmsConfig, admin } = dryRequest;
    if (!admin) {
        return {
            statusCode: 401,
            data: main_api_const_1.defaultDatabaseCmsServerConfig,
        };
    }
    const cleanDatabaseCmsServerConfig = Object.assign(Object.assign({}, databaseCmsConfig), { adminList: [] });
    return {
        statusCode: 200,
        data: cleanDatabaseCmsServerConfig,
    };
}
exports.dataMainApiConfig = dataMainApiConfig;
