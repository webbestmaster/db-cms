import { apiRouteMap } from '../../../data-base-const';
import { catchSuccess, getDryRequest } from '../../api-helper';
import { dataMainApiConfig } from './main-api-module';
export function addMainApi(app, databaseCmsConfig) {
    app.get(apiRouteMap.main.config, (request, response) => {
        const mainConfig = dataMainApiConfig(getDryRequest(databaseCmsConfig, request));
        catchSuccess(mainConfig, response);
    });
}
