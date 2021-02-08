import {UserType} from '../../service/user/user-type';

export type UserContextType = {
    getUser: () => Promise<UserType | Error>;
    user: UserType | null;
    isInGettingUser: boolean;
    gettingUserError: Error | null;
};

// export type GetUserResultType = UserType | Error;
