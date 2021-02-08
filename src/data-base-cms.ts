/* global process */

import path from 'path';

import express, {Request, Response} from 'express';

import {pathToDist} from '../webpack/config';

import {addApiIntoApplication} from './api/api';
import {DatabaseCmsServerConfigType} from './data-base-cms-type';

const CWD = process.cwd();

export function runDBCmsServer(databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    const app = express();

    const {port} = databaseCmsServerConfig;

    addApiIntoApplication(app);

    // *.html
    app.get('*', async (request: Request, response: Response) => {
        response.sendFile(path.join(CWD, pathToDist, '/../index.html'));
    });

    app.listen(port, (): void => {
        console.log(`DbCmsServer running at port: ${port}`);
    });
}
