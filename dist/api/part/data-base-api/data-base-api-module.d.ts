import { ApiResultType, DryRequestType } from '../../api-type';
import { CrudResponseType } from '../../../data-base-cms-type';
export declare function dataBaseCreate(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>>;
export declare function dataBaseRead(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>>;
export declare function dataBaseReadList(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>>;
export declare function dataBaseUpdate(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>>;
export declare function dataBaseDelete(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>>;
