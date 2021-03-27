import {DatabaseCmsServerConfigType} from '../../../data-base-cms-type';

export const defaultDatabaseCmsServerConfig: DatabaseCmsServerConfigType = {
    port: -1,
    modelList: [],
    adminList: [],
    database: {name: '', connectUrl: '', shallCommand: {backup: ''}},
};
