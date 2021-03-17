import {DocumentType, ModelConfigType, SortDirectionType} from '../../../data-base-cms-type';

export type UrlParametersType = {
    modelId: string;
    instanceId: string;
    pageIndex: string;
    pageSize: string;
    // sortDirection: SortDirectionType;
};

export type UrlQueryParametersType = {
    sort: Record<string, SortDirectionType>;
};

export type DefinedRequestDataType = {
    modelConfig: ModelConfigType;
    urlParameters: UrlParametersType;
    urlQueryParameters: UrlQueryParametersType;
    data: DocumentType;
};
