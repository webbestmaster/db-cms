import {Request, Response} from 'express';

import {logError} from '../util/log';

import {ApiResultType, DryRequestType} from './api-type';

export function getDryRequest(request: Request): DryRequestType {
    const body: Record<string, unknown> = request.body || {};

    return {
        body,
    };
}

export function catchSuccess<DataType>(result: ApiResultType<DataType>, response: Response): void {
    response.status(result.statusCode).json(result.data);
}

export function catchError(error: Error, response: Response): void {
    logError(error.message);

    response.status(500).end();
}
