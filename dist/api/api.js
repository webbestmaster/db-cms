"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addApiIntoApplication = void 0;
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
const session_api_1 = require("./part/session-api/session-api");
const data_base_api_1 = require("./part/data-base-api/data-base-api");
const file_api_1 = require("./part/file-api/file-api");
// import {addMainApi} from './part/main-api/main-api';
function addApiIntoApplication(app, databaseCmsConfig) {
    app.set('trust proxy', 1); // trust first proxy
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(express_fileupload_1.default());
    app.disable('x-powered-by');
    // addMainApi(app, databaseCmsConfig);
    file_api_1.addFileApi(app, databaseCmsConfig);
    session_api_1.addSessionApi(app, databaseCmsConfig);
    data_base_api_1.addDataBaseApi(app, databaseCmsConfig);
}
exports.addApiIntoApplication = addApiIntoApplication;
