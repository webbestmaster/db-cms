import {Request} from 'express';
import {FilterQuery} from 'mongodb';

import {getAdminBySession, getSessionData} from '../session-api/session-api-helper';
import {log} from '../../../util/log';
import {
    DatabaseCmsServerConfigType,
    DocumentType,
    ModelConfigType,
    SortDirectionType,
} from '../../../data-base-cms-type';
import {getMapFromObject} from '../../../util/object';
import {findInArray} from '../../../util/array';

import {DefinedRequestDataType, UrlParametersType, UrlQueryParametersType} from './data-base-api-type';
import {defaultUrlParameters} from './data-base-api-const';

export function getUrlQueryParameters(request: Request): UrlQueryParametersType {
    let sort: Record<string, SortDirectionType> = {};
    let find: FilterQuery<DocumentType> = {};

    const {query} = request;

    if (!query) {
        return {sort, find};
    }

    const querySort = query.sort || {};

    Object.keys(querySort).forEach((querySortKey: string) => {
        const sortValue = Number.parseInt(querySort[querySortKey], 10);

        if (sortValue === -1 || sortValue === 1) {
            sort = {...sort, [querySortKey]: sortValue};
        }
    });

    const queryFind = query.find || {};

    Object.keys(queryFind).forEach((queryFindKey: string) => {
        try {
            find = {...find, [queryFindKey]: JSON.parse(queryFind[queryFindKey])};
        } catch {
            log('can not do JSON.parse(queryFind[queryFindKey]): ', queryFind, queryFindKey);
        }
    });

    return {sort, find};
}
