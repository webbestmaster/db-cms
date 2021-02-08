import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {UserType} from '../../service/user/user-type';
import {getUser} from '../../service/user/user-api';
import {catchError} from '../../util/promise';

import {UserContextType} from './user-context-type';
import {defaultUserContextData} from './user-context-const';

export const UserContext: React.Context<UserContextType> = React.createContext<UserContextType>(defaultUserContextData);

type PropsType = {
    children: JSX.Element | Array<JSX.Element>;
};

export function UserProvider(props: PropsType): JSX.Element {
    const {children} = props;
    const [isInGettingUser, setIsInGettingUser] = useState<boolean>(false);
    const [gettingUserError, setGettingUserError] = useState<Error | null>(null);
    const [user, serUser] = useState<UserType | null>(null);

    const memoizedGettingUser = useCallback(function tryToGetUser(): Promise<UserType | Error> {
        setIsInGettingUser(true);
        setGettingUserError(null);
        serUser(null);

        return getUser()
            .then((result: UserType | Error): UserType | Error => {
                setIsInGettingUser(false);

                if (result instanceof Error) {
                    setGettingUserError(result);
                } else {
                    serUser(result);
                }

                console.log('---> get user', result);
                // console.log(JSON.stringify(result, null, 4));

                return result;
            })
            .catch(catchError);
    }, []);

    useEffect(() => {
        memoizedGettingUser();
    }, [memoizedGettingUser]);

    const providerData: UserContextType = useMemo<UserContextType>((): UserContextType => {
        return {
            getUser: memoizedGettingUser,
            user,
            isInGettingUser,
            gettingUserError,
        };
    }, [memoizedGettingUser, user, isInGettingUser, gettingUserError]);

    return <UserContext.Provider value={providerData}>{children}</UserContext.Provider>;
}
