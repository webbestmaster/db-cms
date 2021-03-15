import {Application} from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';

import {DatabaseCmsServerConfigType} from '../data-base-cms-type';

import {addSessionApi} from './part/session-api';
import {addDataBaseApi} from './part/data-base-api';

export function addApiIntoApplication(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.set('trust proxy', 1); // trust first proxy

    app.use(cors());
    app.use(compression({level: 9}));
    app.use(bodyParser.json({limit: '75mb'}));
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.disable('x-powered-by');

    addSessionApi(app, databaseCmsServerConfig);
    addDataBaseApi(app, databaseCmsServerConfig);
}
