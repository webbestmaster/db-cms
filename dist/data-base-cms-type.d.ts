import { ObjectId } from 'mongodb';
import { Schema } from 'jsonschema';
export declare type ModelConfigType = {
    name: string;
    id: string;
    schema: Schema;
    keyId: string;
};
export declare type AdminType = {
    login: string;
    password: string;
    hash: string;
    apiKey: string;
};
export declare type LoginDataType = {
    login: string;
};
export declare type DatabaseCmsServerConfigType = {
    file: {
        folder: string;
    };
    port: number;
    modelList: Array<ModelConfigType>;
    adminList: Array<AdminType>;
    database: {
        name: string;
        connectUrl: string;
        shallCommand: {
            start: string;
            update: string;
        };
    };
};
export declare type AuthResponseType = {
    user: LoginDataType | null;
};
export declare type DocumentValueType = string | number | boolean | Array<string> | Array<number> | Array<boolean> | ObjectId;
export declare type DocumentType = Record<string, DocumentValueType>;
export declare type CrudResponseType = {
    data: DocumentType | Array<DocumentType> | null;
    size: number;
};
export declare type SortDirectionType = -1 | 1;
