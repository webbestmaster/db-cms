"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBaseMaster = void 0;
const mongodb_1 = require("mongodb");
exports.dataBaseMaster = {
    getCollection: function getCollection(databaseCmsConfig, collectionName) {
        return exports.dataBaseMaster.getDataBase().collection(collectionName);
    },
    getDataBase: function getDataBase() {
        throw new Error('No data base. Initialize method dataBaseMaster.getDataBase');
    },
    initialDataBase: function initialDataBase(databaseCmsConfig) {
        const { database } = databaseCmsConfig;
        const { name, connectUrl } = database;
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        };
        return mongodb_1.MongoClient.connect(connectUrl, options).then((client) => {
            const dataBase = client.db(name);
            exports.dataBaseMaster.getDataBase = function getDataBase() {
                return dataBase;
            };
            return dataBase;
        });
    },
};
