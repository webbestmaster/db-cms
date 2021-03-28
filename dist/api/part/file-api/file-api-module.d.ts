import { Request } from 'express';
import { ApiResultType, DryRequestType } from '../../api-type';
export declare function fileApiUpload(dryRequest: DryRequestType, request: Request): Promise<ApiResultType<string>>;
