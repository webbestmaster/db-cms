// @flow

import crypto from 'crypto';

export const serverConst = {
    secretKey: crypto.randomBytes(16).toString('hex'), // 32 symbols
    session: {
        sessionKey: 'session-id',
    },
    api: {
        apiHeaderKey: 'x-api-header-key',
    },
};

export const apiRouteMap = {
    main: {
        modelList: '/api/main/model-list', // not started - get model list
    },
    auth: {
        login: '/api/auth/login', // done - post
        logout: '/api/auth/logout', // done - get
        logoutAll: '/api/auth/logout-all', // done - get
    },
    crud: {
        create: '/api/crud/create/:modelId', // done - post
        read: '/api/crud/read/:modelId/:instanceId', // done - get
        readList: '/api/crud/read-list/:modelId/:pageIndex/:pageSize', // done - get
        update: '/api/crud/update/:modelId', // done - post
        annihilate: '/api/crud/delete/:modelId/:instanceId', // done - delete
    },
};
