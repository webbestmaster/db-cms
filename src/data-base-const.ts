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
        login: '/api/auth/login',
        logout: '/api/auth/logout',
        logoutAll: '/api/auth/logout-all',
    },
    crud: {
        create: '/api/crud/create/:modelId',
        read: '/api/crud/read/:modelId/:instanceId',
        readList: '/api/crud/read/:modelId', // TODO: add search query here
        update: '/api/crud/update/:modelId',
        remove: '/api/crud/delete/:modelId',
    },
};
