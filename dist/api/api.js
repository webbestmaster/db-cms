import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import { addSessionApi } from './part/session-api/session-api';
import { addDataBaseApi } from './part/data-base-api/data-base-api';
import { addFileApi } from './part/file-api/file-api';
// import {addMainApi} from './part/main-api/main-api';
export function addApiIntoApplication(app, databaseCmsConfig) {
    app.set('trust proxy', 1); // trust first proxy
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(fileUpload());
    app.disable('x-powered-by');
    // addMainApi(app, databaseCmsConfig);
    addFileApi(app, databaseCmsConfig);
    addSessionApi(app, databaseCmsConfig);
    addDataBaseApi(app, databaseCmsConfig);
}
