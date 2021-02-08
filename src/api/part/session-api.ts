/* global process */

import path from 'path';

import session from 'express-session';

import {Application, Request, Response} from 'express';

import {pathToDist, pathToStaticFileFolder} from '../../../webpack/config';

const CWD = process.cwd();

export function addSessionApi(app: Application): void {
    app.use(
        session({
            name: 'session-id',
            secret: String(Date.now()),
            resave: false,
            saveUninitialized: true,
            // store: new MongoStore({
            //     url: dataBaseConst.url,
            //     secret: passwordKey,
            // }),
            cookie: {
                secure: true,
            },
        })
    );
}
