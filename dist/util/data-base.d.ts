import { Collection, Db } from 'mongodb';
import { DatabaseCmsConfigType } from '../data-base-cms-type';
export declare function getCollection<ItemType>(databaseCmsConfig: DatabaseCmsConfigType, collectionName: string): Promise<Collection<ItemType>>;
export declare function getDataBase(databaseCmsConfig: DatabaseCmsConfigType): Promise<Db>;
