"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDBCmsServer = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = require("./api/api");
const log_1 = require("./util/log");
const api_helper_1 = require("./api/api-helper");
const data_base_1 = require("./util/data-base");
const { initialDataBase } = data_base_1.dataBaseMaster;
function runDBCmsServer(databaseCmsConfig) {
    const app = express_1.default();
    const { port } = databaseCmsConfig;
    api_1.addApiIntoApplication(app, databaseCmsConfig);
    app.listen(port, () => {
        log_1.log(`running at port: ${port}`);
    });
    initialDataBase(databaseCmsConfig)
        .then(() => log_1.log('data base is initialized'))
        .catch(console.error);
    api_helper_1.handleServerStart(databaseCmsConfig);
}
exports.runDBCmsServer = runDBCmsServer;
