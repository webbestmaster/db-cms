import express from 'express';
import { addApiIntoApplication } from './api/api';
import { log } from './util/log';
import { handleServerStart } from './api/api-helper';
export function runDBCmsServer(databaseCmsConfig) {
    const app = express();
    const { port } = databaseCmsConfig;
    addApiIntoApplication(app, databaseCmsConfig);
    app.listen(port, () => {
        log(`running at port: ${port}`);
    });
    handleServerStart(databaseCmsConfig);
}
