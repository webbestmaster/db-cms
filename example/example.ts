import {runDBCmsServer, DatabaseCmsServerConfigType} from '../src/data-base-cms';

const databaseCmsServerConfigType: DatabaseCmsServerConfigType = {
    port: 3000,
    hostname: 'localhost',
};

runDBCmsServer(databaseCmsServerConfigType);
