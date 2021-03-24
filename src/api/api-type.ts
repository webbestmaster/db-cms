import {FilterQuery} from 'mongodb';

import {
    AdminType,
    DatabaseCmsServerConfigType,
    DocumentType,
    ModelConfigType,
    SortDirectionType,
} from '../data-base-cms-type';

import {SessionDataType} from './part/session-api/session-api-type';

export type UrlParametersType = {
    modelId: string;
    instanceId: string;
    pageIndex: string;
    pageSize: string;
};

export type UrlQueryParametersType = {
    sort: Record<string, SortDirectionType>;
    find: FilterQuery<DocumentType>;
};

export type DryRequestType = {
    body: DocumentType;
    sessionData: SessionDataType | null;
    admin: AdminType | null;
    urlParameters: UrlParametersType;
    urlQueryParameters: UrlQueryParametersType;
    modelConfig: ModelConfigType | null;
    databaseCmsServerConfig: DatabaseCmsServerConfigType;
};

export type ApiResultType<DataType> = {
    statusCode: 200 | 401 | 404;
    data: DataType;
};
