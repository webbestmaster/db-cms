import {Application} from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';

import {DatabaseCmsServerConfigType} from '../data-base-cms-type';

import {addSessionApi} from './part/session-api/session-api';
import {addDataBaseApi} from './part/data-base-api/data-base-api';
import {addMainApi} from './part/main-api/main-api';
import {addFileApi} from './part/file-api/file-api';

export function addApiIntoApplication(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.set('trust proxy', 1); // trust first proxy

    app.use(cors());
    app.use(compression({level: 9}));
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.use(
        fileUpload({
            limits: {
                // 75 mb
                fileSize: 75 * 1024 * 1024,
            },
        })
    );
    app.disable('x-powered-by');

    addMainApi(app, databaseCmsServerConfig);
    addFileApi(app, databaseCmsServerConfig);
    addSessionApi(app, databaseCmsServerConfig);
    addDataBaseApi(app, databaseCmsServerConfig);
}
