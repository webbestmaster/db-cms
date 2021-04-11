/* global Buffer */

import {exec} from 'child_process';

import {Request, Response} from 'express';
import {FilterQuery} from 'mongodb';

import {log, logError} from '../util/log';
import {
    AdminType,
    DatabaseCmsConfigType,
    DocumentType,
    ModelConfigType,
    SortDirectionType,
} from '../data-base-cms-type';
import {getMapFromObject} from '../util/object';
import {findInArray} from '../util/array';

import {ApiResultType, DryRequestType, UrlParametersType, UrlQueryParametersType} from './api-type';
import {SessionDataType} from './part/session-api/session-api-type';
import {getAdminByApiKey, getAdminBySession, getSessionData} from './part/session-api/session-api-helper';
import {defaultUrlParameters} from './api-const';

function getUrlQueryParameters(request: Request): UrlQueryParametersType {
    let sort: Record<string, SortDirectionType> = {};
    let find: FilterQuery<DocumentType> = {};

    const {query} = request;

    if (!query) {
        return {sort, find};
    }

    const querySort = query.sort || {};

    Object.keys(querySort).forEach((querySortKey: string) => {
        const sortValue = Number.parseInt(querySort[querySortKey], 10);

        if (sortValue === -1 || sortValue === 1) {
            sort = {...sort, [querySortKey]: sortValue};
        }
    });

    const queryFind = query.find || {};

    Object.keys(queryFind).forEach((queryFindKey: string) => {
        try {
            find = {...find, [queryFindKey]: JSON.parse(queryFind[queryFindKey])};
        } catch {
            log('can not do JSON.parse(queryFind[queryFindKey]): ', queryFind, queryFindKey);
        }
    });

    return {sort, find};
}

export function getDryRequest(databaseCmsConfig: DatabaseCmsConfigType, request: Request): DryRequestType {
    const {body: requestBody, params: requestParameters} = request;
    const body: Record<string, unknown> = requestBody || {};
    const sessionData: SessionDataType | null = getSessionData(request);
    const admin: AdminType | null
        = getAdminBySession(databaseCmsConfig, sessionData) || getAdminByApiKey(databaseCmsConfig, request);
    const urlParameters: UrlParametersType = getMapFromObject<UrlParametersType>(
        requestParameters || {},
        defaultUrlParameters
    );
    const modelConfig: ModelConfigType | null = findInArray<ModelConfigType>(databaseCmsConfig.modelList, {
        id: urlParameters.modelId,
    });
    const urlQueryParameters: UrlQueryParametersType = getUrlQueryParameters(request);

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

export function catchSuccess<DataType>(result: ApiResultType<DataType>, response: Response): void {
    response.status(result.statusCode).json(result.data);
}

export function catchError(error: Error, response: Response): void {
    logError(error.message);

    response.status(500).end();
}

function handleDataBaseChangeCallback(error: unknown, stdout: string | Buffer, stderr: string | Buffer) {
    if (error instanceof Error) {
        logError(stderr.toString());
        return;
    }

    log('[SUCCESS]: database.shallCommand.backup:', stdout.toString());
}

function handleServerStartCallback(error: unknown, stdout: string | Buffer, stderr: string | Buffer) {
    if (error instanceof Error) {
        logError(stderr.toString());
        return;
    }

    log('[SUCCESS]: database.shallCommand.start:', stdout.toString());
}

export function handleServerStart(databaseCmsConfig: DatabaseCmsConfigType): void {
    exec(databaseCmsConfig.database.shallCommand.start, handleServerStartCallback);
}

export function handleDataBaseChange(databaseCmsConfig: DatabaseCmsConfigType): void {
    exec(databaseCmsConfig.database.shallCommand.update, handleDataBaseChangeCallback);
}
