import {Collection, ObjectId} from 'mongodb';

import {ApiResultType, DryRequestType} from '../../api-type';
import {CrudResponseType, DocumentType} from '../../../data-base-cms-type';
import {getIsValid} from '../../../util/schema';
import {getCollection} from '../../../util/data-base';

import {dataBaseErrorResult} from './data-base-api-const';

export async function dataBaseCreate(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>> {
    const {urlParameters, body, modelConfig, databaseCmsServerConfig, admin} = dryRequest;
    const {modelId} = urlParameters;

    if (!admin) {
        return {
            statusCode: 401,
            data: dataBaseErrorResult,
        };
    }

    if (!modelConfig) {
        return {
            statusCode: 404,
            data: dataBaseErrorResult,
        };
    }

    const {schema} = modelConfig;

    if (!getIsValid(body, schema)) {
        return {
            statusCode: 404,
            data: dataBaseErrorResult,
        };
    }

    const collection: Collection<DocumentType> = await getCollection<DocumentType>(databaseCmsServerConfig, modelId);

    await collection.insertOne({...body, _id: new ObjectId()});

    return {
        statusCode: 200,
        data: {data: body, size: 1},
    };
}

export async function dataBaseRead(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>> {
    const {databaseCmsServerConfig, modelConfig, urlParameters, admin} = dryRequest;

    if (!admin) {
        return {
            statusCode: 401,
            data: dataBaseErrorResult,
        };
    }

    if (!modelConfig) {
        return {
            statusCode: 404,
            data: dataBaseErrorResult,
        };
    }

    const {keyId} = modelConfig;
    const {instanceId, modelId} = urlParameters;
    const collection: Collection<DocumentType> = await getCollection<DocumentType>(databaseCmsServerConfig, modelId);
    const instance: DocumentType | null = await collection.findOne({[keyId]: instanceId});

    if (!instance) {
        return {
            statusCode: 404,
            data: dataBaseErrorResult,
        };
    }

    return {
        statusCode: 200,
        data: {data: instance, size: 1},
    };
}

export async function dataBaseReadList(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>> {
    const {databaseCmsServerConfig, modelConfig, urlParameters, urlQueryParameters, admin} = dryRequest;

    if (!admin) {
        return {
            statusCode: 401,
            data: dataBaseErrorResult,
        };
    }

    if (!modelConfig) {
        return {
            statusCode: 404,
            data: dataBaseErrorResult,
        };
    }

    const {sort, find} = urlQueryParameters;
    const {modelId, pageIndex, pageSize} = urlParameters;
    const pageIndexInt = Number.parseInt(pageIndex, 10);
    const pageSizeInt = Number.parseInt(pageSize, 10);

    const collection: Collection<DocumentType> = await getCollection<DocumentType>(databaseCmsServerConfig, modelId);
    const cursor = collection
        .find(find)
        .sort(sort)
        .skip(pageSizeInt * pageIndexInt)
        .limit(pageSizeInt);

    const [instanceList, count]: [Array<DocumentType>, number] = await Promise.all<Array<DocumentType>, number>([
        cursor.toArray(),
        cursor.count(false),
    ]);

    return {
        statusCode: 200,
        data: {data: instanceList, size: count},
    };
}
