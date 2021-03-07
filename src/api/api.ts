import {Application} from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

import {addSessionApi} from './part/session-api';

export function addApiIntoApplication(app: Application): void {
    app.set('trust proxy', 1); // trust first proxy

    app.use(compression({level: 9}));
    app.use(bodyParser.json({limit: '75mb'}));
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.disable('x-powered-by');

    addSessionApi(app);
}
