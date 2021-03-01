/*
/!* global process *!/

import path from 'path';

import {Application, Request, Response} from 'express';

import {pathToDist, pathToStaticFileFolder} from '../../../webpack/config';

const CWD = process.cwd();

export function addStaticApi(app: Application): void {
    // usual static files
    app.get(pathToStaticFileFolder + '*', (request: Request, response: Response) => {
        response.sendFile(path.join(CWD, pathToDist, request.params['0']));
    });
}
*/
