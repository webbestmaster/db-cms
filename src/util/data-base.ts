import {MongoClient, Db, Collection, MongoError} from 'mongodb';

import {DatabaseCmsServerConfigType} from '../data-base-cms-type';

import {log} from './log';

const getDataBaseCache: {[key: string]: Promise<Db>} = {};

export function getCollection<ItemType>(
    databaseCmsServerConfig: DatabaseCmsServerConfigType,
    collectionName: string
): Promise<Collection<ItemType>> {
    return getDataBase(databaseCmsServerConfig).then(
        (dataBase: Db): Collection<ItemType> => dataBase.collection<ItemType>(collectionName)
    );
}

export function getDataBase(databaseCmsServerConfig: DatabaseCmsServerConfigType): Promise<Db> {
    const {database} = databaseCmsServerConfig;
    const {name, connectUrl} = database;
    const cachedDatabase: Promise<Db> = getDataBaseCache[name];

    if (cachedDatabase) {
        log('getDataBase: MongoDataBase get from cache, name:', name);
        return cachedDatabase;
    }

    const newMongoClientPromise = MongoClient.connect(connectUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((client: MongoClient): Db => client.db(name));

    getDataBaseCache[name] = newMongoClientPromise;

    return newMongoClientPromise;
}
