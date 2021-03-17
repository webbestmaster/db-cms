import {FilterQuery} from 'mongodb';

import {DocumentType, ModelConfigType, SortDirectionType} from '../../../data-base-cms-type';

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

export type DefinedRequestDataType = {
    modelConfig: ModelConfigType;
    urlParameters: UrlParametersType;
    urlQueryParameters: UrlQueryParametersType;
    data: DocumentType;
};
