export type DryRequestType = {
    body: Record<string, unknown>;
};

export type ApiResultType<DataType> = {
    statusCode: 200 | 404;
    data: DataType;
};
