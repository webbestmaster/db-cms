import {ApiResultType, DryRequestType} from '../../api-type';
import {DatabaseCmsConfigType} from '../../../data-base-cms-type';

import {defaultDatabaseCmsServerConfig} from './main-api-const';

export function dataMainApiConfig(dryRequest: DryRequestType): ApiResultType<DatabaseCmsConfigType> {
    const {databaseCmsConfig, admin} = dryRequest;

    if (!admin) {
        return {
            statusCode: 401,
            data: defaultDatabaseCmsServerConfig,
        };
    }

    const cleanDatabaseCmsServerConfig: DatabaseCmsConfigType = {
        ...databaseCmsConfig,
        adminList: [],
    };

    return {
        statusCode: 200,
        data: cleanDatabaseCmsServerConfig,
    };
}
