import {DocumentType, ModelConfigType} from '../../../data-base-cms-type';

export type UrlParametersType = {
    modelId: string;
    instanceId: string;
};

export type UrlQueryParametersType = unknown;

export type DefinedRequestDataType = {
    modelConfig: ModelConfigType;
    urlParameters: UrlParametersType;
    urlQueryParameters: UrlQueryParametersType;
    data: DocumentType;
};
