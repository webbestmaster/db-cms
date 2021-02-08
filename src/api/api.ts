import express, {Application, Request, Response} from 'express';

import {addStaticApi} from './part/static-api';
import {addSessionApi} from './part/session-api';

export function addApiIntoApplication(app: Application): void {
    addSessionApi(app);
    addStaticApi(app);
}
