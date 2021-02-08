import express, {Application, Request, Response} from 'express';

import {addStaticApi} from './part/static-api';

export function addApiIntoApplication(app: Application): void {
    addStaticApi(app);
}
