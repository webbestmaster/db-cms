import { MongoClient } from 'mongodb';
import { log } from './log';
const getDataBaseCache = {};
export function getCollection(databaseCmsConfig, collectionName) {
    return getDataBase(databaseCmsConfig).then((dataBase) => dataBase.collection(collectionName));
}
export function getDataBase(databaseCmsConfig) {
    const { database } = databaseCmsConfig;
    const { name, connectUrl } = database;
    const cachedDatabase = getDataBaseCache[name];
    if (cachedDatabase) {
        log('getDataBase: MongoDataBase get from cache, name:', name);
        return cachedDatabase;
    }
    const newMongoClientPromise = MongoClient.connect(connectUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((client) => client.db(name));
    getDataBaseCache[name] = newMongoClientPromise;
    return newMongoClientPromise;
}
