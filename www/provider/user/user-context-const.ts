import {UserType} from '../../service/user/user-type';

import {LoginResultType, LogoutResultType} from '../../service/auth/auth-type';

import {UserContextType} from './user-context-type';

export const defaultUserContextData: UserContextType = {
    getUser: (): Promise<UserType> => {
        throw new Error('getUser: Override me');
    },
    user: null,
    login: (): Promise<LoginResultType> => {
        throw new Error('login: Override me');
    },
    logout: (): Promise<LogoutResultType> => {
        throw new Error('logout: Override me');
    },
};
