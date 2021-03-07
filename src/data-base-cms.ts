import express, {Request, Response} from 'express';

import {addApiIntoApplication} from './api/api';
import {DatabaseCmsServerConfigType} from './data-base-cms-type';

export function runDBCmsServer(databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    const app = express();

    const {port} = databaseCmsServerConfig;

    addApiIntoApplication(app, databaseCmsServerConfig);

    app.listen(port, (): void => {
        console.log(`[DbCmsServer] running at port: ${port}`);
    });
}
