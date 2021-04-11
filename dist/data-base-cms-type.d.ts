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
export declare type DatabaseCmsConfigType = {
    file: {
        folder: string;
    };
    api: {
        prefix: string;
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
export declare type DocumentElementaryType = string | number | boolean | null;
export declare type DocumentElementaryListType = Array<DocumentElementaryType>;
export declare type DocumentValueType = DocumentElementaryType | DocumentElementaryListType;
export declare type DocumentType = Record<string, unknown>;
export declare type CrudResponseType = {
    data: DocumentType | Array<DocumentType> | null;
    size: number;
};
export declare type SortDirectionType = -1 | 1;
