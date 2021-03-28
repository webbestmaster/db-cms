import express from 'express';
import {Schema} from 'jsonschema';

import {addApiIntoApplication} from './api/api';
import {AdminType, DatabaseCmsConfigType, ModelConfigType} from './data-base-cms-type';
import {log} from './util/log';
import {handleServerStart} from './api/api-helper';

export function runDBCmsServer(databaseCmsConfig: DatabaseCmsConfigType): void {
    const app = express();

    const {port} = databaseCmsConfig;

    addApiIntoApplication(app, databaseCmsConfig);

    app.listen(port, (): void => {
        log(`running at port: ${port}`);
    });

    handleServerStart(databaseCmsConfig);
}

export {DatabaseCmsConfigType, ModelConfigType, AdminType, Schema};
