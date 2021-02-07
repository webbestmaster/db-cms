import {createServer, IncomingMessage, ServerResponse, Server} from 'http';

export type DatabaseCmsServerConfigType = {
    port: number; // 3000
    hostname: string; // '127.0.0.1'
    // callback?: () => void;
};

export function runDBCmsServer(databaseCmsServerConfig: DatabaseCmsServerConfigType): void {
    const {hostname, port} = databaseCmsServerConfig;

    const server: Server = createServer((request: IncomingMessage, response: ServerResponse): void => {
        // eslint-disable-next-line no-param-reassign
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Hello World');
    });

    server.listen(port, hostname, (): void => {
        console.log(`DbCmsServer running at http://${hostname}:${port}/`);
    });
}
