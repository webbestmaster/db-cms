import {MongoClient, Db, Collection, MongoError} from 'mongodb';
import {Application, Request, Response} from 'express';
import {Validator} from 'jsonschema';

import {apiRouteMap, dataBaseConst, serverConst} from '../../data-base-const';
import {
    AdminType,
    AuthResponseType,
    CrudResponseType,
    DatabaseCmsServerConfigType,
    DocumentType,
    ModelConfigType,
} from '../../data-base-cms-type';
import {getAdminBySession, getSessionData, removeSessionCookie, setSessionCookie} from '../../util/session';
import {log} from '../../util/log';
import {getMapFromObject} from '../../util/object';
import {findInArray} from '../../util/array';
import {getCollection} from '../../util/data-base';
import {getIsValid} from '../../util/schema';

const validator = new Validator();

export function addDataBaseApi(app: Application, databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    app.post(apiRouteMap.crud.create, (request: Request, response: Response) => {
        const sessionData = getSessionData(request);

        log('[DbCmsServer] sessionData:', sessionData);

        const errorResult: CrudResponseType = {
            data: null,
            isSuccess: false,
        };

        const admin = getAdminBySession(databaseCmsServerConfig, sessionData);

        if (!admin) {
            response.json(errorResult);
            return;
        }

        const {modelId} = getMapFromObject<{modelId: string}>(request.params || {}, {modelId: ''});

        const modelConfig = findInArray<ModelConfigType>(databaseCmsServerConfig.modelList, {id: modelId});

        if (!modelConfig) {
            response.json(errorResult);
            return;
        }

        const data = request.body;
        const {schema} = modelConfig;

        if (!getIsValid(data, schema)) {
            response.json(errorResult);
            return;
        }

        getCollection<DocumentType>(dataBaseConst.mainDataBaseName, modelId)
            .then((collection: Collection<DocumentType>) => collection.insert({...data}))
            .then(() => {
                const successResult: CrudResponseType = {isSuccess: true, data};

                response.json(successResult);
            })
            .catch(() => {
                response.json(errorResult);
            });
    });
}
