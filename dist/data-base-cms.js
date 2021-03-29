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
function runDBCmsServer(databaseCmsConfig) {
    const app = express_1.default();
    const { port } = databaseCmsConfig;
    api_1.addApiIntoApplication(app, databaseCmsConfig);
    app.listen(port, () => {
        log_1.log(`running at port: ${port}`);
    });
    api_helper_1.handleServerStart(databaseCmsConfig);
}
exports.runDBCmsServer = runDBCmsServer;
