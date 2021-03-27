import path from 'path';

import {Application, Request, Response} from 'express';

import {ApiResultType, DryRequestType} from '../../api-type';

export async function fileApiUpload(dryRequest: DryRequestType, request: Request): Promise<ApiResultType<string>> {
    const {admin, databaseCmsServerConfig} = dryRequest;

    if (!admin) {
        return {
            statusCode: 401,
            data: '',
        };
    }

    const {files = {}} = request;
    const {file} = files;
    // @ts-ignore
    const {md5, name} = file;

    const fileName = `${md5}-${name}`;

    // @ts-ignore
    await file.mv(path.join(databaseCmsServerConfig.file.folder, fileName));

    return {
        statusCode: 200,
        data: fileName,
    };
}
