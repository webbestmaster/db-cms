import {MongoClient, Db, Collection, MongoError, ObjectId} from 'mongodb';
import {Application, Request, Response} from 'express';

import {ApiResultType, DryRequestType} from '../../api-type';
import {AuthResponseType, CrudResponseType, DocumentType} from '../../../data-base-cms-type';

import {getIsValid} from '../../../util/schema';

import {getCollection} from '../../../util/data-base';

import {dataBaseErrorResult} from './data-base-api-const';

export async function dataBaseCreate(dryRequest: DryRequestType): Promise<ApiResultType<CrudResponseType>> {
    const {urlParameters, body, modelConfig, databaseCmsServerConfig} = dryRequest;
    const {modelId} = urlParameters;

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
        data: {isSuccess: true, data: body, size: 1},
    };
}
