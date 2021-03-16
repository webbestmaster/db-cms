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
    isSuccess: boolean;
    user: LoginDataType | null;
};

export type DocumentType = {
    [key: string]: string | number | Array<string> | Array<number>;
};

export type CrudResponseType = {
    isSuccess: boolean;
    data: DocumentType | null;
};

export type KeyValueType = {[key: string]: string | void};
