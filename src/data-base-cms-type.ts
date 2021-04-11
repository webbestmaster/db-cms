// import {ObjectId} from 'mongodb';
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
    apiKey: string; // secret to authorize without login, leave empty to disable
};

export type LoginDataType = {
    login: string;
};

export type DatabaseCmsConfigType = {
    file: {
        folder: string;
    };
    api: {
        prefix: string; // /db-cms/
    };
    port: number; // 3000
    modelList: Array<ModelConfigType>;
    adminList: Array<AdminType>;
    database: {
        name: string; // 'main-db'
        connectUrl: string; // 'mongodb://localhost:27001,localhost:27002,localhost:27003,localhost:27004?replicaSet=dbCmsReplica'
        shallCommand: {
            start: string;
            update: string;
        };
    };
};

export type AuthResponseType = {
    user: LoginDataType | null;
};

export type DocumentElementaryType = string | number | boolean | null;
export type DocumentElementaryListType = Array<DocumentElementaryType>;

export type DocumentValueType = DocumentElementaryType | DocumentElementaryListType;

export type DocumentType = Record<string, unknown>;

export type CrudResponseType = {
    data: DocumentType | Array<DocumentType> | null;
    size: number;
};

export type SortDirectionType = -1 | 1;
