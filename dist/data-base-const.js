"use strict";
// @flow
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouteMap = exports.serverConst = void 0;
const crypto_1 = __importDefault(require("crypto"));
exports.serverConst = {
    secretKey: crypto_1.default.randomBytes(16).toString('hex'),
    session: {
        sessionKey: 'session-id',
    },
    api: {
        apiHeaderKey: 'x-api-header-key',
    },
};
exports.apiRouteMap = {
    // main: {
    //     config: '/api/main/config', // done - get config
    // },
    file: {
        upload: '/api/file/upload', // done - post file
    },
    auth: {
        login: '/api/auth/login',
        logout: '/api/auth/logout',
        logoutAll: '/api/auth/logout-all', // done - get
    },
    crud: {
        create: '/api/crud/create/:modelId',
        read: '/api/crud/read/:modelId/:instanceId',
        readList: '/api/crud/read-list/:modelId/:pageIndex/:pageSize',
        update: '/api/crud/update/:modelId',
        annihilate: '/api/crud/delete/:modelId/:instanceId', // done - delete
    },
};
