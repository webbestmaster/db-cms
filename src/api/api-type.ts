import {AdminType} from '../data-base-cms-type';

import {SessionDataType} from './part/session-api/session-api-type';

export type DryRequestType = {
    body: Record<string, unknown>;
    sessionData: SessionDataType | null;
    admin: AdminType | null;
};

export type ApiResultType<DataType> = {
    statusCode: 200 | 404;
    data: DataType;
};
