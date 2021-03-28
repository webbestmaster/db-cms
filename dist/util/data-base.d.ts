import { Collection, Db } from 'mongodb';
import { DatabaseCmsServerConfigType } from '../data-base-cms-type';
export declare function getCollection<ItemType>(databaseCmsServerConfig: DatabaseCmsServerConfigType, collectionName: string): Promise<Collection<ItemType>>;
export declare function getDataBase(databaseCmsServerConfig: DatabaseCmsServerConfigType): Promise<Db>;
