import {DatabaseCmsServerConfigType} from '../../../data-base-cms-type';

export const defaultDatabaseCmsServerConfig: DatabaseCmsServerConfigType = {
    file: {folder: ''},
    port: -1,
    modelList: [],
    adminList: [],
    database: {name: '', connectUrl: '', shallCommand: {start: '', update: ''}},
};
