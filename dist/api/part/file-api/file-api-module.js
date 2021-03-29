"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileApiUpload = void 0;
const path_1 = __importDefault(require("path"));
function fileApiUpload(dryRequest, request) {
    return __awaiter(this, void 0, void 0, function* () {
        const { admin, databaseCmsConfig } = dryRequest;
        if (!admin) {
            return {
                statusCode: 401,
                data: '',
            };
        }
        const { files = {} } = request;
        const { file } = files;
        // @ts-ignore
        const { md5, name } = file;
        const fileName = `${md5}-${name}`;
        // @ts-ignore
        yield file.mv(path_1.default.join(databaseCmsConfig.file.folder, fileName));
        return {
            statusCode: 200,
            data: fileName,
        };
    });
}
exports.fileApiUpload = fileApiUpload;
