import express, {Request, Response} from 'express';

import {addApiIntoApplication} from './api/api';
import {DatabaseCmsServerConfigType} from './data-base-cms-type';
import {log} from './util/log';
import {prepareDataBase} from './util/data-base';

export function runDBCmsServer(databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    // prepareDataBase(databaseCmsServerConfig, );

    const app = express();

    const {port} = databaseCmsServerConfig;

    addApiIntoApplication(app, databaseCmsServerConfig);

    app.listen(port, (): void => {
        log(`running at port: ${port}`);
    });
}
