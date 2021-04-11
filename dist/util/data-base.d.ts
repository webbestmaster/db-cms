import { Collection, Db } from 'mongodb';
import { DatabaseCmsConfigType } from '../data-base-cms-type';
export declare const dataBaseMaster: {
    getCollection: <ItemType>(databaseCmsConfig: DatabaseCmsConfigType, collectionName: string) => Collection<ItemType>;
    getDataBase: () => Db;
    initialDataBase: (databaseCmsConfig: DatabaseCmsConfigType) => Promise<Db>;
};
