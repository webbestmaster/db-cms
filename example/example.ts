import {Schema} from 'jsonschema';

import {runDBCmsServer} from '../src/data-base-cms';
import {DatabaseCmsServerConfigType, ModelConfigType} from '../src/data-base-cms-type';
import {getRandomString} from '../src/util/string';

const userModel: ModelConfigType = {
    name: 'User',
    id: 'user-model',
    schema: {
        type: 'object',
        properties: {
            login: {type: 'string'},
            password: {type: 'string'},
        },
        required: ['login', 'password'],
    },
};

const documentModel: ModelConfigType = {
    name: 'Document',
    id: 'document-model',
    schema: {
        type: 'object',
        properties: {
            title: {type: 'string'},
            description: {type: 'string'},
            content: {type: 'string'},
            author: {type: 'string'},
        },
        required: ['title', 'description', 'content', 'author'],
    },
};

const databaseCmsServerConfigType: DatabaseCmsServerConfigType = {
    port: 3000,
    modelList: [userModel, documentModel],
    adminList: [
        {
            login: 'admin',
            password: 'some-password',
            hash: getRandomString(),
        },
    ],
};

runDBCmsServer(databaseCmsServerConfigType);
