import express from 'express';
import {Schema} from 'jsonschema';

import {addApiIntoApplication} from './api/api';
import {AdminType, DatabaseCmsConfigType, ModelConfigType} from './data-base-cms-type';
import {log} from './util/log';
import {handleServerStart} from './api/api-helper';
import {dataBaseMaster} from './util/data-base';

const {initialDataBase} = dataBaseMaster;

export function runDBCmsServer(databaseCmsConfig: DatabaseCmsConfigType): void {
    const app = express();

    const {port} = databaseCmsConfig;

    addApiIntoApplication(app, databaseCmsConfig);

    app.listen(port, (): void => {
        log(`running at port: ${port}`);
    });

    initialDataBase(databaseCmsConfig)
        .then(() => log('data base is initialized'))
        .catch(console.error);
    handleServerStart(databaseCmsConfig);
}

export {DatabaseCmsConfigType, ModelConfigType, AdminType, Schema};
