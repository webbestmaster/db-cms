import React from 'react';

import loginStyle from './login.scss';

export function Login(): JSX.Element {
    return (
        <div className={loginStyle.login}>
            <form>
                <label>
                    <input type="text" placeholder="Login"/>
                </label>
                <br/>
                <label>
                    <input type="password" placeholder="Password"/>
                </label>
                <br/>
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}
