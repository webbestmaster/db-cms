import {ObjectId} from 'mongodb';
import {Schema} from 'jsonschema';

export type ModelConfigType = {
    name: string; // user or document or some instance - displayed name
    id: string; // unique schema id
    schema: Schema;
    keyId: string; // key in schema.properties, key value is unique
};

export type AdminType = {
    login: string;
    password: string;
    hash: string; // secret hash to check valid/invalid session, and to drop all sessions
};

export type LoginDataType = {
    login: string;
};

export type DatabaseCmsServerConfigType = {
    port: number; // 3000
    modelList: Array<ModelConfigType>;
    adminList: Array<AdminType>;
    database: {
        name: string; // 'main-db'
        connectUrl: string; // 'mongodb://localhost:27001,localhost:27002,localhost:27003,localhost:27004?replicaSet=dbCmsReplica'
        shallCommand: {
            backup: string;
        };
    };
};

export type AuthResponseType = {
    user: LoginDataType | null;
};

export type DocumentValueType = string | number | boolean | Array<string> | Array<number> | Array<boolean> | ObjectId;

export type DocumentType = Record<string, DocumentValueType>;

export type CrudResponseType = {
    isSuccess: boolean;
    data: DocumentType | Array<DocumentType> | null;
    size: number;
};

export type SortDirectionType = -1 | 1;
