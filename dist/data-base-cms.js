import express from 'express';
import { addApiIntoApplication } from './api/api';
import { log } from './util/log';
import { handleServerStart } from './api/api-helper';
export function runDBCmsServer(databaseCmsServerConfig) {
    const app = express();
    const { port } = databaseCmsServerConfig;
    addApiIntoApplication(app, databaseCmsServerConfig);
    app.listen(port, () => {
        log(`running at port: ${port}`);
    });
    handleServerStart(databaseCmsServerConfig);
}
