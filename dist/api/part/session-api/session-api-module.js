var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { findInArray } from '../../../util/array';
import { getRandomString } from '../../../util/string';
import { removeSessionCookie, setSessionCookie } from './session-api-helper';
export function authLogin(dryRequest, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body, databaseCmsServerConfig } = dryRequest;
        const { login, password } = body;
        const admin = findInArray(databaseCmsServerConfig.adminList, { login, password });
        if (!admin) {
            return {
                statusCode: 404,
                data: { user: null },
            };
        }
        setSessionCookie(response, admin);
        return {
            statusCode: 200,
            data: {
                user: { login: admin.login },
            },
        };
    });
}
export function authLogout(response) {
    return __awaiter(this, void 0, void 0, function* () {
        removeSessionCookie(response);
        return {
            statusCode: 200,
            data: { user: null },
        };
    });
}
export function authLogoutAll(dryRequest, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { admin } = dryRequest;
        if (!admin) {
            return {
                statusCode: 404,
                data: { user: null },
            };
        }
        removeSessionCookie(response);
        admin.hash = getRandomString();
        return {
            statusCode: 200,
            data: { user: null },
        };
    });
}
