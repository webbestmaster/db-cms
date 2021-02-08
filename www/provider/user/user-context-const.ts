import {UserType} from '../../service/user/user-type';

import {UserContextType} from './user-context-type';

export const defaultUserContextData: UserContextType = {
    getUser: (): Promise<UserType | Error> => Promise.resolve(new Error('getUser: Override me')),
    user: null,
    isInGettingUser: false,
    gettingUserError: null,
};
