import {CrudResponseType} from '../../../data-base-cms-type';

import {UrlParametersType} from './data-base-api-type';

export const dataBaseErrorResult: CrudResponseType = {
    data: null,
    isSuccess: false,
};

export const defaultUrlParameters: UrlParametersType = {
    modelId: '',
    instanceId: '',
};
