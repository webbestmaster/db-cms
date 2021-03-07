import {UserType} from '../../service/user/user-type';
import {LoginResultType, LogoutResultType} from '../../service/auth/auth-type';

export type UserContextType = {
    getUser: () => Promise<UserType>;
    user: UserType | null;
    login: () => Promise<LoginResultType>;
    logout: () => Promise<LogoutResultType>;
};

// export type GetUserResultType = UserType | Error;
