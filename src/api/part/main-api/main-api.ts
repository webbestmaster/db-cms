/*
import {Application, Request, Response} from 'express';

import {apiRouteMap} from '../../../data-base-const';
import {DatabaseCmsConfigType} from '../../../data-base-cms-type';
import {catchSuccess, getDryRequest} from '../../api-helper';

import {dataMainApiConfig} from './main-api-module';

export function addMainApi(app: Application, databaseCmsConfig: DatabaseCmsConfigType): void {
    const apiPrefix = databaseCmsConfig.api.prefix;

    app.get(apiPrefix + apiRouteMap.main.config, (request: Request, response: Response) => {
        const mainConfig = dataMainApiConfig(getDryRequest(databaseCmsConfig, request));

        catchSuccess<DatabaseCmsConfigType>(mainConfig, response);
    });
}
*/
