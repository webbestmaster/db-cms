/* global process */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0 */

const modeDevelopmentName = 'development';
const modeProductionName = 'production';

const availableModeList = [modeDevelopmentName, modeProductionName];
const {NODE_ENV} = process.env;

const nodeEnvironmentName = availableModeList.includes(NODE_ENV) ? NODE_ENV : modeDevelopmentName;
console.log('[INFO] webpack mode:', nodeEnvironmentName);

const pathToStaticFileFolder = '/db-cms-front/static/'; // '/static';

module.exports.nodeEnvironment = nodeEnvironmentName;

module.exports.isDevelopment = nodeEnvironmentName === modeDevelopmentName;
module.exports.isProduction = nodeEnvironmentName === modeProductionName;

module.exports.cwd = process.cwd();

module.exports.fileRegExp = /\.(webp|png|jpg|jpeg|gif|svg|otf|ttf|woff|woff2|eot|mp3)$/;

module.exports.pathToStaticFileFolder = pathToStaticFileFolder;

module.exports.pathToDist = '/dist' + pathToStaticFileFolder;

module.exports.webpackDevServerPort = 9090;
