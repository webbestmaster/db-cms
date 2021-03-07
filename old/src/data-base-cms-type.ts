import {Schema} from 'jsonschema';

export type ModelConfigType = {
    name: string; // user or document or some instance - displayed name
    id: string; // unique schema id
    schema: Schema;
};

export type AdminType = {
    login: string;
    password: string;
};

export type DatabaseCmsServerConfigType = {
    port: number; // 3000
    // dbName: string;
    modelList: Array<ModelConfigType>;
    adminList: Array<AdminType>;
};
