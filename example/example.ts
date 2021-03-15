import {Schema} from 'jsonschema';

import {runDBCmsServer} from '../src/data-base-cms';
import {DatabaseCmsServerConfigType, ModelConfigType} from '../src/data-base-cms-type';
import {getRandomString} from '../src/util/string';

const mainDataBaseName = 'main-db';

export const databaseDumpFolderName = 'db-dump';

const backUpCommand: string = [
    `mkdir -p ${databaseDumpFolderName};`,
    'mongodump',
    '--port=27001',
    `--archive=${databaseDumpFolderName}/db-dump-\`date +%Y-%m-%d--%H-%M-%S\`.zip`,
    `--db=${mainDataBaseName}`,
].join(' ');

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
    database: {
        name: mainDataBaseName,
        connectUrl: 'mongodb://localhost:27001,localhost:27002,localhost:27003,localhost:27004?replicaSet=dbCmsReplica',
        shallCommand: {
            backup: backUpCommand,
        },
    },
};

runDBCmsServer(databaseCmsServerConfigType);
