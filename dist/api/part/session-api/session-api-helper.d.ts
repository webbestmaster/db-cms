import { Request, Response } from 'express';
import { AdminType, DatabaseCmsServerConfigType } from '../../../data-base-cms-type';
import { SessionDataType } from './session-api-type';
export declare function setSessionCookie(response: Response, admin: AdminType): void;
export declare function removeSessionCookie(response: Response): void;
export declare function getSessionData(request: Request): SessionDataType | null;
export declare function getAdminBySession(databaseCmsServerConfig: DatabaseCmsServerConfigType, sessionData: SessionDataType | null): AdminType | null;
export declare function getAdminByApiKey(databaseCmsServerConfig: DatabaseCmsServerConfigType, request: Request): AdminType | null;
