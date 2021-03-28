import { Request, Response } from 'express';
import { DatabaseCmsServerConfigType } from '../data-base-cms-type';
import { ApiResultType, DryRequestType } from './api-type';
export declare function getDryRequest(databaseCmsServerConfig: DatabaseCmsServerConfigType, request: Request): DryRequestType;
export declare function catchSuccess<DataType>(result: ApiResultType<DataType>, response: Response): void;
export declare function catchError(error: Error, response: Response): void;
export declare function handleServerStart(databaseCmsServerConfig: DatabaseCmsServerConfigType): void;
export declare function handleDataBaseChange(databaseCmsServerConfig: DatabaseCmsServerConfigType): void;
