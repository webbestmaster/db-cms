var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectId } from 'mongodb';
import { getIsValid } from '../../../util/schema';
import { getCollection } from '../../../util/data-base';
import { dataBaseErrorResult } from './data-base-api-const';
export function dataBaseCreate(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { urlParameters, body, modelConfig, databaseCmsServerConfig, admin } = dryRequest;
        const { modelId } = urlParameters;
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
        const { schema, keyId } = modelConfig;
        if (!getIsValid(body, schema)) {
            return {
                statusCode: 400,
                data: dataBaseErrorResult,
            };
        }
        const collection = yield getCollection(databaseCmsServerConfig, modelId);
        // check for model already exists
        const instance = yield collection.findOne({ [keyId]: body[keyId] });
        if (instance) {
            return {
                statusCode: 400,
                data: dataBaseErrorResult,
            };
        }
        yield collection.insertOne(Object.assign(Object.assign({}, body), { _id: new ObjectId() }));
        return {
            statusCode: 200,
            data: { data: body, size: 1 },
        };
    });
}
export function dataBaseRead(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { databaseCmsServerConfig, modelConfig, urlParameters, admin } = dryRequest;
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
        const { keyId } = modelConfig;
        const { instanceId, modelId } = urlParameters;
        const collection = yield getCollection(databaseCmsServerConfig, modelId);
        const instance = yield collection.findOne({ [keyId]: instanceId });
        if (!instance) {
            return {
                statusCode: 404,
                data: dataBaseErrorResult,
            };
        }
        return {
            statusCode: 200,
            data: { data: instance, size: 1 },
        };
    });
}
export function dataBaseReadList(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { databaseCmsServerConfig, modelConfig, urlParameters, urlQueryParameters, admin } = dryRequest;
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
        const { sort, find } = urlQueryParameters;
        const { modelId, pageIndex, pageSize } = urlParameters;
        const pageIndexInt = Number.parseInt(pageIndex, 10);
        const pageSizeInt = Number.parseInt(pageSize, 10);
        const collection = yield getCollection(databaseCmsServerConfig, modelId);
        const cursor = collection
            .find(find)
            .sort(sort)
            .skip(pageSizeInt * pageIndexInt)
            .limit(pageSizeInt);
        const [instanceList, count] = yield Promise.all([
            cursor.toArray(),
            cursor.count(false),
        ]);
        return {
            statusCode: 200,
            data: { data: instanceList, size: count },
        };
    });
}
export function dataBaseUpdate(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { databaseCmsServerConfig, modelConfig, urlParameters, urlQueryParameters, admin, body } = dryRequest;
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
        const { keyId } = modelConfig;
        const { modelId } = urlParameters;
        const searchQuery = { [keyId]: body[keyId] };
        const collection = yield getCollection(databaseCmsServerConfig, modelId);
        // check for model already exists
        const instance = yield collection.findOne(searchQuery);
        if (!instance) {
            return {
                statusCode: 404,
                data: dataBaseErrorResult,
            };
        }
        yield collection.updateOne(searchQuery, { $set: body });
        return {
            statusCode: 200,
            data: { data: body, size: 1 },
        };
    });
}
export function dataBaseDelete(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { databaseCmsServerConfig, modelConfig, urlParameters, urlQueryParameters, admin, body } = dryRequest;
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
        const { keyId } = modelConfig;
        const { modelId, instanceId } = urlParameters;
        const searchQuery = { [keyId]: instanceId };
        const collection = yield getCollection(databaseCmsServerConfig, modelId);
        // check for model already exists
        const instance = yield collection.findOne(searchQuery);
        if (!instance) {
            return {
                statusCode: 404,
                data: dataBaseErrorResult,
            };
        }
        yield collection.deleteOne(searchQuery);
        return {
            statusCode: 200,
            data: { data: null, size: 1 },
        };
    });
}
