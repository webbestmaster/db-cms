import React from 'react';

import loginStyle from './login.scss';

export function Login(): JSX.Element {
    return (
        <div className={loginStyle.login}>
            <form>
                <label>
                    <input placeholder="Login" type="text" />
                </label>

                <br />

                <label>
                    <input placeholder="Password" type="password" />
                </label>

                <br />

                <input type="submit" value="submit" />
            </form>
        </div>
    );
}
