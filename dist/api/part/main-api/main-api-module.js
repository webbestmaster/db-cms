import { defaultDatabaseCmsServerConfig } from './main-api-const';
export function dataMainApiConfig(dryRequest) {
    const { databaseCmsServerConfig, admin } = dryRequest;
    if (!admin) {
        return {
            statusCode: 401,
            data: defaultDatabaseCmsServerConfig,
        };
    }
    const cleanDatabaseCmsServerConfig = Object.assign(Object.assign({}, databaseCmsServerConfig), { adminList: [] });
    return {
        statusCode: 200,
        data: cleanDatabaseCmsServerConfig,
    };
}
