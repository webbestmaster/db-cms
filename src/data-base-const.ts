// @flow

const mainDataBaseName = 'main-db';

export const databaseDumpFolderName = 'db-dump';

const backUpCommand: string = [
    `mkdir -p ${databaseDumpFolderName};`,
    'mongodump',
    '--port=27001',
    `--archive=${databaseDumpFolderName}/db-dump-\`date +%Y-%m-%d--%H-%M-%S\`.zip`,
    `--db=${mainDataBaseName}`,
].join(' ');

export const dataBaseConst = {
    url: 'mongodb://localhost:27001,localhost:27002,localhost:27003,localhost:27004?replicaSet=MyBestReplica',
    shallCommand: {
        backup: backUpCommand,
    },
    name: mainDataBaseName,
    collection: {
        user: 'user',
        document: 'document',
    },
};

export const mongoUserRoleMap = {
    user: 'user',
    admin: 'admin',
};

export const apiRouteMap = {
    auth: {
        login: '/api/login',
        logout: '/api/logout',
    },
};
