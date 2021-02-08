import {runDBCmsServer} from '../src/data-base-cms';
import {DatabaseCmsServerConfigType} from '../src/data-base-cms-type';

const databaseCmsServerConfigType: DatabaseCmsServerConfigType = {
    port: 3000,
    modelList: [],
    adminList: [],
};

runDBCmsServer(databaseCmsServerConfigType);
