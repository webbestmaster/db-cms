import { Response } from 'express';
import { ApiResultType, DryRequestType } from '../../api-type';
import { AuthResponseType } from '../../../data-base-cms-type';
export declare function authLogin(dryRequest: DryRequestType, response: Response): Promise<ApiResultType<AuthResponseType>>;
export declare function authLogout(response: Response): Promise<ApiResultType<AuthResponseType>>;
export declare function authLogoutAll(dryRequest: DryRequestType, response: Response): Promise<ApiResultType<AuthResponseType>>;
