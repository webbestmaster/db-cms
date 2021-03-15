import {MongoClient, Db, Collection, MongoError} from 'mongodb';

import {DatabaseCmsServerConfigType} from '../data-base-cms-type';
import {dataBaseConst} from '../data-base-const';

import {log} from './log';

const getDataBaseCache: {[key: string]: Promise<Db>} = {};

export function getCollection<ItemType>(dataBaseName: string, collectionName: string): Promise<Collection<ItemType>> {
    return getDataBase(dataBaseName).then(
        (dataBase: Db): Collection<ItemType> => dataBase.collection<ItemType>(collectionName)
    );
}

export function getDataBase(name: string): Promise<Db> {
    const cachedDatabase: Promise<Db> = getDataBaseCache[name];

    if (cachedDatabase) {
        log('getDataBase: MongoDataBase get from cache, name:', name);
        return cachedDatabase;
    }

    const newMongoClientPromise = MongoClient.connect(dataBaseConst.url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((client: MongoClient): Db => client.db(name));

    getDataBaseCache[name] = newMongoClientPromise;

    return newMongoClientPromise;
}

export function prepareDataBase(databaseCmsServerConfig: DatabaseCmsServerConfigType, collectionName: string): void {
    log('prepareDataBase', databaseCmsServerConfig);

    getCollection<{[key: string]: unknown}>(dataBaseConst.mainDataBaseName, collectionName)
        .then(console.log)
        .catch(console.log);

    /*
        .then((collection: Collection<{[key: string]: unknown}>) => {
            console.log(collection);

            return collection.findOne({name: 's'});
        })
        .catch(error => {
            console.log(error);
        });
*/
}
