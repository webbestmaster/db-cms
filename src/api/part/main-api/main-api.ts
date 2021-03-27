import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {DatabaseCmsServerConfigType} from '../../../data-base-cms-type';
import {catchSuccess, getDryRequest} from '../../api-helper';

import {dataMainApiConfig} from './main-api-module';

export function addMainApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.get(apiRouteMap.main.config, (request: Request, response: Response) => {
        const mainConfig = dataMainApiConfig(getDryRequest(databaseCmsServerConfig, request));

        catchSuccess<DatabaseCmsServerConfigType>(mainConfig, response);
    });
}
