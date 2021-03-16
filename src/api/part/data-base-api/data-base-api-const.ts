import {CrudResponseType, SortDirectionType} from '../../../data-base-cms-type';

import {UrlParametersType} from './data-base-api-type';

export const dataBaseErrorResult: CrudResponseType = {
    data: null,
    isSuccess: false,
    size: -1,
};

export const defaultUrlParameters: UrlParametersType = {
    modelId: '',
    instanceId: '',
    pageIndex: '',
    pageSize: '',
};

export const defaultDocumentSort: SortDirectionType = 1;
