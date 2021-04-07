"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGetUser = exports.authLogoutAll = exports.authLogout = exports.authLogin = void 0;
const array_1 = require("../../../util/array");
const string_1 = require("../../../util/string");
const session_api_helper_1 = require("./session-api-helper");
function authLogin(dryRequest, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body, databaseCmsConfig } = dryRequest;
        const { login, password } = body;
        const admin = array_1.findInArray(databaseCmsConfig.adminList, { login, password });
        if (!admin) {
            return {
                statusCode: 404,
                data: { user: null },
            };
        }
        session_api_helper_1.setSessionCookie(response, admin);
        return {
            statusCode: 200,
            data: {
                user: { login: admin.login },
            },
        };
    });
}
exports.authLogin = authLogin;
function authLogout(response) {
    return __awaiter(this, void 0, void 0, function* () {
        session_api_helper_1.removeSessionCookie(response);
        return {
            statusCode: 200,
            data: { user: null },
        };
    });
}
exports.authLogout = authLogout;
function authLogoutAll(dryRequest, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { admin } = dryRequest;
        if (!admin) {
            return {
                statusCode: 404,
                data: { user: null },
            };
        }
        session_api_helper_1.removeSessionCookie(response);
        admin.hash = string_1.getRandomString();
        return {
            statusCode: 200,
            data: { user: null },
        };
    });
}
exports.authLogoutAll = authLogoutAll;
function authGetUser(dryRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { admin } = dryRequest;
        if (!admin) {
            return {
                statusCode: 401,
                data: { user: null },
            };
        }
        const { login } = admin;
        return {
            statusCode: 200,
            data: { user: { login } },
        };
    });
}
exports.authGetUser = authGetUser;
