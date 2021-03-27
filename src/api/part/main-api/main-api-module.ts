import {ApiResultType, DryRequestType} from '../../api-type';
import {DatabaseCmsServerConfigType} from '../../../data-base-cms-type';

import {defaultDatabaseCmsServerConfig} from './main-api-const';

export function dataMainApiConfig(dryRequest: DryRequestType): ApiResultType<DatabaseCmsServerConfigType> {
    const {databaseCmsServerConfig, admin} = dryRequest;

    if (!admin) {
        return {
            statusCode: 401,
            data: defaultDatabaseCmsServerConfig,
        };
    }

    const cleanDatabaseCmsServerConfig: DatabaseCmsServerConfigType = {
        ...databaseCmsServerConfig,
        adminList: [],
    };

    return {
        statusCode: 200,
        data: cleanDatabaseCmsServerConfig,
    };
}
