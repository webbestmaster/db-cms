/* global Buffer */
import { exec } from 'child_process';
import { log, logError } from '../util/log';
import { getMapFromObject } from '../util/object';
import { findInArray } from '../util/array';
import { getAdminByApiKey, getAdminBySession, getSessionData } from './part/session-api/session-api-helper';
import { defaultUrlParameters } from './api-const';
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
            log('can not do JSON.parse(queryFind[queryFindKey]): ', queryFind, queryFindKey);
        }
    });
    return { sort, find };
}
export function getDryRequest(databaseCmsServerConfig, request) {
    const body = request.body || {};
    const sessionData = getSessionData(request);
    const admin = getAdminBySession(databaseCmsServerConfig, sessionData) || getAdminByApiKey(databaseCmsServerConfig, request);
    const urlParameters = getMapFromObject(request.params || {}, defaultUrlParameters);
    const modelConfig = findInArray(databaseCmsServerConfig.modelList, {
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
        databaseCmsServerConfig,
    };
}
export function catchSuccess(result, response) {
    response.status(result.statusCode).json(result.data);
}
export function catchError(error, response) {
    logError(error.message);
    response.status(500).end();
}
function handleDataBaseChangeCallback(error, stdout, stderr) {
    if (error instanceof Error) {
        logError(stderr.toString());
        return;
    }
    log('[SUCCESS]: database.shallCommand.backup:', stdout.toString());
}
function handleServerStartCallback(error, stdout, stderr) {
    if (error instanceof Error) {
        logError(stderr.toString());
        return;
    }
    log('[SUCCESS]: database.shallCommand.start:', stdout.toString());
}
export function handleServerStart(databaseCmsServerConfig) {
    exec(databaseCmsServerConfig.database.shallCommand.start, handleServerStartCallback);
}
export function handleDataBaseChange(databaseCmsServerConfig) {
    exec(databaseCmsServerConfig.database.shallCommand.update, handleDataBaseChangeCallback);
}
