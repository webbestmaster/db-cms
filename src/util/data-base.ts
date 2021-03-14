import {MongoClient} from 'mongodb';

import {DatabaseCmsServerConfigType} from '../data-base-cms-type';
import {dataBaseConst} from '../data-base-const';

import {log} from './log';

const getDataBaseCache: {[key: string]: Promise<MongoClient>} = {};

export function getDataBase(name: string): Promise<MongoClient> {
    if (getDataBaseCache[name]) {
        log('getDataBase: MongoDataBase get from cache, name:', name);
        return getDataBaseCache[name];
    }

    const newMongoClientPromise = MongoClient.connect(dataBaseConst.url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    getDataBaseCache[name] = newMongoClientPromise;

    return newMongoClientPromise;
}

/*
export function getDataBase(name: string): Promise<MongoDataBase> {
    if (name in getDataBaseCache) {
        log('getDataBase: MongoDataBase get from cache, name:', name);
        return getDataBaseCache[name];
    }

    getDataBaseCache[name] = new Promise<MongoDataBase>(
        (resolve: MongoDataBase => mixed, reject: (error: Error) => mixed) => {
        MongoClient.connect(
            dataBaseConst.url,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            (clientError: ?Error, client: ?MongoClient) => {
            if (clientError) {
                // console.error('Can not connect to mongo server');
                reject(new Error('Can not connect to mongo server'));
                return;
            }

            if (!client) {
                // console.error('Mongo client is not define');
                reject(new Error('Mongo client is not define'));
                return;
            }

            resolve(client.db(name));
        }
    );
    }
);

    return getDataBaseCache[name];
}
*/

export function prepareDataBase(databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    log('prepareDataBase', databaseCmsServerConfig);

    // 1 check for exists and create needed documents
}
