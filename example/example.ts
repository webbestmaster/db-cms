import {runDBCmsServer} from '../src/data-base-cms';
import {DatabaseCmsServerConfigType} from '../src/data-base-cms-type';
import {getRandomString} from '../src/util/string';

const databaseCmsServerConfigType: DatabaseCmsServerConfigType = {
    port: 3000,
    modelList: [],
    adminList: [
        {
            login: 'admin',
            password: 'some-password',
            hash: getRandomString(),
        },
    ],
};

runDBCmsServer(databaseCmsServerConfigType);
