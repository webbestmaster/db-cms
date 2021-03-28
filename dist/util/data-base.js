import { MongoClient } from 'mongodb';
import { log } from './log';
const getDataBaseCache = {};
export function getCollection(databaseCmsServerConfig, collectionName) {
    return getDataBase(databaseCmsServerConfig).then((dataBase) => dataBase.collection(collectionName));
}
export function getDataBase(databaseCmsServerConfig) {
    const { database } = databaseCmsServerConfig;
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
