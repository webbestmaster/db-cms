import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {DatabaseCmsConfigType} from '../../../data-base-cms-type';
import {catchError, catchSuccess, getDryRequest} from '../../api-helper';
import {ApiResultType} from '../../api-type';

import {fileApiUpload} from './file-api-module';

export function addFileApi(app: Application, databaseCmsConfig: DatabaseCmsConfigType): void {
    app.post(apiRouteMap.file.upload, (request: Request, response: Response) => {
        fileApiUpload(getDryRequest(databaseCmsConfig, request), request)
            .then((result: ApiResultType<string>) => {
                catchSuccess<string>(result, response);
            })
            .catch((error: Error) => {
                catchError(error, response);
            });
    });
}
