import {ApiResultType, DryRequestType} from '../../api-type';

export async function fileApiUpload(dryRequest: DryRequestType): Promise<ApiResultType<string>> {
    const {databaseCmsServerConfig, admin} = dryRequest;

    if (!admin) {
        return {
            statusCode: 401,
            data: '',
        };
    }

    return {
        statusCode: 200,
        data: '',
    };
}
