"use strict";
/* global Buffer */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDataBaseChange = exports.handleServerStart = exports.catchError = exports.catchSuccess = exports.getDryRequest = void 0;
const child_process_1 = require("child_process");
const log_1 = require("../util/log");
const object_1 = require("../util/object");
const array_1 = require("../util/array");
const session_api_helper_1 = require("./part/session-api/session-api-helper");
const api_const_1 = require("./api-const");
function getUrlQueryParameters(request) {
    let sort = {};
    let find = {};
    const { query } = request;
    if (!query) {
        return { sort, find };
    }
    const querySort = query.sort || {};
    Object.keys(querySort).forEach((querySortKey) => {
        const sortValue = Number.parseInt(querySort[querySortKey], 10);
        if (sortValue === -1 || sortValue === 1) {
            sort = Object.assign(Object.assign({}, sort), { [querySortKey]: sortValue });
        }
    });
    const queryFind = query.find || {};
    Object.keys(queryFind).forEach((queryFindKey) => {
        try {
            find = Object.assign(Object.assign({}, find), { [queryFindKey]: JSON.parse(queryFind[queryFindKey]) });
        }
        catch (_a) {
            log_1.log('can not do JSON.parse(queryFind[queryFindKey]): ', queryFind, queryFindKey);
        }
    });
    return { sort, find };
}
function getDryRequest(databaseCmsConfig, request) {
    const body = request.body || {};
    const sessionData = session_api_helper_1.getSessionData(request);
    const admin = session_api_helper_1.getAdminBySession(databaseCmsConfig, sessionData) || session_api_helper_1.getAdminByApiKey(databaseCmsConfig, request);
    const urlParameters = object_1.getMapFromObject(request.params || {}, api_const_1.defaultUrlParameters);
    const modelConfig = array_1.findInArray(databaseCmsConfig.modelList, {
        id: urlParameters.modelId,
    });
    const urlQueryParameters = getUrlQueryParameters(request);
    return {
        body,
        sessionData,
        admin,
        modelConfig,
        urlParameters,
        urlQueryParameters,
        databaseCmsConfig,
    };
}
exports.getDryRequest = getDryRequest;
function catchSuccess(result, response) {
    response.status(result.statusCode).json(result.data);
}
exports.catchSuccess = catchSuccess;
function catchError(error, response) {
    log_1.logError(error.message);
    response.status(500).end();
}
exports.catchError = catchError;
function handleDataBaseChangeCallback(error, stdout, stderr) {
    if (error instanceof Error) {
        log_1.logError(stderr.toString());
        return;
    }
    log_1.log('[SUCCESS]: database.shallCommand.backup:', stdout.toString());
}
function handleServerStartCallback(error, stdout, stderr) {
    if (error instanceof Error) {
        log_1.logError(stderr.toString());
        return;
    }
    log_1.log('[SUCCESS]: database.shallCommand.start:', stdout.toString());
}
function handleServerStart(databaseCmsConfig) {
    child_process_1.exec(databaseCmsConfig.database.shallCommand.start, handleServerStartCallback);
}
exports.handleServerStart = handleServerStart;
function handleDataBaseChange(databaseCmsConfig) {
    child_process_1.exec(databaseCmsConfig.database.shallCommand.update, handleDataBaseChangeCallback);
}
exports.handleDataBaseChange = handleDataBaseChange;
