"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataBase = exports.getCollection = void 0;
const mongodb_1 = require("mongodb");
const log_1 = require("./log");
const getDataBaseCache = {};
function getCollection(databaseCmsConfig, collectionName) {
    return getDataBase(databaseCmsConfig).then((dataBase) => dataBase.collection(collectionName));
}
exports.getCollection = getCollection;
function getDataBase(databaseCmsConfig) {
    const { database } = databaseCmsConfig;
    const { name, connectUrl } = database;
    const cachedDatabase = getDataBaseCache[name];
    if (cachedDatabase) {
        log_1.log('getDataBase: MongoDataBase get from cache, name:', name);
        return cachedDatabase;
    }
    const newMongoClientPromise = mongodb_1.MongoClient.connect(connectUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((client) => client.db(name));
    getDataBaseCache[name] = newMongoClientPromise;
    return newMongoClientPromise;
}
exports.getDataBase = getDataBase;
