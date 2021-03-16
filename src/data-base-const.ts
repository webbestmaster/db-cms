// @flow

import crypto from 'crypto';

export const serverConst = {
    secretKey: crypto.randomBytes(16).toString('hex'), // 32 symbols
    session: {
        cookieKey: 'session-id',
    },
};

export const apiRouteMap = {
    auth: {
        login: '/api/auth/login', // done - post
        logout: '/api/auth/logout', // done - get
        logoutAll: '/api/auth/logout-all', // done - get
    },
    crud: {
        create: '/api/crud/create/:modelId', // done - post
        read: '/api/crud/read/:modelId/:instanceId', // done - get
        readList: '/api/crud/read-list/:modelId/:pageIndex/:pageSize', // in progress - get // TODO: add search/filter query and sort
        update: '/api/crud/update/:modelId/:instanceId', // not started - post
        annihilate: '/api/crud/delete/:modelId/:instanceId', // not started - delete
    },
};
