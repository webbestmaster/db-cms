import {DatabaseCmsConfigType} from '../../../data-base-cms-type';

export const defaultDatabaseCmsServerConfig: DatabaseCmsConfigType = {
    file: {folder: ''},
    port: -1,
    modelList: [],
    adminList: [],
    database: {name: '', connectUrl: '', shallCommand: {start: '', update: ''}},
};
