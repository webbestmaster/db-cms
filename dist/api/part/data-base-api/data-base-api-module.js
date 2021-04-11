"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBaseDelete = exports.dataBaseUpdate = exports.dataBaseReadList = exports.dataBaseRead = exports.dataBaseCreate = void 0;
const mongodb_1 = require("mongodb");
const schema_1 = require("../../../util/schema");
const data_base_1 = require("../../../util/data-base");
const { getCollection } = data_base_1.dataBaseMaster;
const data_base_api_const_1 = require("./data-base-api-const");
function dataBaseCreate(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { urlParameters, body, modelConfig, databaseCmsConfig, admin } = dryRequest;
        const { modelId } = urlParameters;
        if (!admin) {
            return {
                statusCode: 401,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        if (!modelConfig) {
            return {
                statusCode: 404,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        const { schema, keyId } = modelConfig;
        if (!schema_1.getIsValid(body, schema)) {
            return {
                statusCode: 400,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        const collection = getCollection(databaseCmsConfig, modelId);
        // check for model already exists
        const instance = yield collection.findOne({ [keyId]: body[keyId] });
        if (instance) {
            return {
                statusCode: 400,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        yield collection.insertOne(Object.assign(Object.assign({}, body), { _id: new mongodb_1.ObjectId() }));
        return {
            statusCode: 200,
            data: { data: body, size: 1 },
        };
    });
}
exports.dataBaseCreate = dataBaseCreate;
function dataBaseRead(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { databaseCmsConfig, modelConfig, urlParameters, admin } = dryRequest;
        if (!admin) {
            return {
                statusCode: 401,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        if (!modelConfig) {
            return {
                statusCode: 404,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        const { keyId } = modelConfig;
        const { instanceId, modelId } = urlParameters;
        const collection = getCollection(databaseCmsConfig, modelId);
        const instance = yield collection.findOne({ [keyId]: instanceId });
        if (!instance) {
            return {
                statusCode: 404,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        return {
            statusCode: 200,
            data: { data: instance, size: 1 },
        };
    });
}
exports.dataBaseRead = dataBaseRead;
function dataBaseReadList(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { databaseCmsConfig, modelConfig, urlParameters, urlQueryParameters, admin } = dryRequest;
        if (!admin) {
            return {
                statusCode: 401,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        if (!modelConfig) {
            return {
                statusCode: 404,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        const { sort, find } = urlQueryParameters;
        const { modelId, pageIndex, pageSize } = urlParameters;
        const pageIndexInt = Number.parseInt(pageIndex, 10);
        const pageSizeInt = Number.parseInt(pageSize, 10);
        const collection = getCollection(databaseCmsConfig, modelId);
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
exports.dataBaseReadList = dataBaseReadList;
function dataBaseUpdate(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { databaseCmsConfig, modelConfig, urlParameters, urlQueryParameters, admin, body } = dryRequest;
        if (!admin) {
            return {
                statusCode: 401,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        if (!modelConfig) {
            return {
                statusCode: 404,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        const { keyId } = modelConfig;
        const { modelId } = urlParameters;
        const searchQuery = { [keyId]: body[keyId] };
        const collection = getCollection(databaseCmsConfig, modelId);
        // check for model already exists
        const instance = yield collection.findOne(searchQuery);
        if (!instance) {
            return {
                statusCode: 404,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        yield collection.updateOne(searchQuery, { $set: body });
        return {
            statusCode: 200,
            data: { data: body, size: 1 },
        };
    });
}
exports.dataBaseUpdate = dataBaseUpdate;
function dataBaseDelete(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { databaseCmsConfig, modelConfig, urlParameters, urlQueryParameters, admin, body } = dryRequest;
        if (!admin) {
            return {
                statusCode: 401,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        if (!modelConfig) {
            return {
                statusCode: 404,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        const { keyId } = modelConfig;
        const { modelId, instanceId } = urlParameters;
        const searchQuery = { [keyId]: instanceId };
        const collection = getCollection(databaseCmsConfig, modelId);
        // check for model already exists
        const instance = yield collection.findOne(searchQuery);
        if (!instance) {
            return {
                statusCode: 404,
                data: data_base_api_const_1.dataBaseErrorResult,
            };
        }
        yield collection.deleteOne(searchQuery);
        return {
            statusCode: 200,
            data: { data: null, size: 1 },
        };
    });
}
exports.dataBaseDelete = dataBaseDelete;
