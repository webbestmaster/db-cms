import { Request, Response } from 'express';
import { DatabaseCmsConfigType } from '../data-base-cms-type';
import { ApiResultType, DryRequestType } from './api-type';
export declare function getDryRequest(databaseCmsConfig: DatabaseCmsConfigType, request: Request): DryRequestType;
export declare function catchSuccess<DataType>(result: ApiResultType<DataType>, response: Response): void;
export declare function catchError(error: Error, response: Response): void;
export declare function handleServerStart(databaseCmsConfig: DatabaseCmsConfigType): void;
export declare function handleDataBaseChange(databaseCmsConfig: DatabaseCmsConfigType): void;
