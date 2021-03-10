import {Schema} from 'jsonschema';

export type ModelConfigType = {
    name: string; // user or document or some instance - displayed name
    id: string; // unique schema id
    schema: Schema;
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
    // dbName: string;
    modelList: Array<ModelConfigType>;
    adminList: Array<AdminType>;
};

export type AuthResponseType = {
    isSuccess: boolean;
    user: LoginDataType | null;
};

export type KeyValueType = {[key: string]: string | void};
