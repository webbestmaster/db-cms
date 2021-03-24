import {AdminType, DocumentType, ModelConfigType} from '../data-base-cms-type';

import {SessionDataType} from './part/session-api/session-api-type';
import {UrlParametersType, UrlQueryParametersType} from './part/data-base-api/data-base-api-type';

export type DryRequestType = {
    body: DocumentType;
    sessionData: SessionDataType | null;
    admin: AdminType | null;
    urlParameters: UrlParametersType;
    urlQueryParameters: UrlQueryParametersType;
    modelConfig: ModelConfigType | null;
};

export type ApiResultType<DataType> = {
    statusCode: 200 | 404;
    data: DataType;
};
