import { apiRouteMap } from '../../../data-base-const';
import { catchError, catchSuccess, getDryRequest } from '../../api-helper';
import { fileApiUpload } from './file-api-module';
export function addFileApi(app, databaseCmsConfig) {
    app.post(apiRouteMap.file.upload, (request, response) => {
        fileApiUpload(getDryRequest(databaseCmsConfig, request), request)
            .then((result) => {
            catchSuccess(result, response);
        })
            .catch((error) => {
            catchError(error, response);
        });
    });
}
