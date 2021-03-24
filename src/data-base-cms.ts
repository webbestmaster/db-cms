import express from 'express';

import {addApiIntoApplication} from './api/api';
import {DatabaseCmsServerConfigType} from './data-base-cms-type';
import {log} from './util/log';

export function runDBCmsServer(databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    const app = express();

    const {port} = databaseCmsServerConfig;

    addApiIntoApplication(app, databaseCmsServerConfig);

    app.listen(port, (): void => {
        log(`running at port: ${port}`);
    });
}
