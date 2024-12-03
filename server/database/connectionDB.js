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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionDB = void 0;
const pg_1 = require("pg");
const extractionCredentials_1 = require("../configs/dotenv/extractCredentials/extractionCredentials");
class ConnectionDB extends extractionCredentials_1.ExtractionCredentials {
    constructor() {
        var _a, _b, _c, _d, _e;
        super();
        this.connection = new pg_1.Pool({
            user: ((_a = this.extractionCredentials()) === null || _a === void 0 ? void 0 : _a.username) || '',
            password: ((_b = this.extractionCredentials()) === null || _b === void 0 ? void 0 : _b.password) || '',
            port: ((_c = this.extractionCredentials()) === null || _c === void 0 ? void 0 : _c.port) || 0,
            host: ((_d = this.extractionCredentials()) === null || _d === void 0 ? void 0 : _d.host) || '',
            database: ((_e = this.extractionCredentials()) === null || _e === void 0 ? void 0 : _e.database) || ''
        });
    }
    modelConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.connection.connect();
            }
            catch (error) {
                console.error('Erro ao instanciar o modelo de conexão: ', error);
            }
        });
    }
    modelDisconect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection.end();
            }
            catch (error) {
                console.error('Erro ao instancia o modelo de disconexão: ', error);
            }
        });
    }
    modelQuery(SQLCommand, values) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.connection.connect();
                const result = yield client.query(SQLCommand, values);
                return result.rows;
            }
            catch (error) {
                console.error('Erro ao executar a query:', error);
                throw error;
            }
            finally {
                client === null || client === void 0 ? void 0 : client.release();
            }
        });
    }
    modelQueryUnic(SQLCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.connection.connect();
                const result = yield client.query(SQLCommand);
                return result.rows;
            }
            catch (error) {
                console.error('Erro ao executar a query:', error);
                throw error;
            }
            finally {
                client === null || client === void 0 ? void 0 : client.release();
            }
        });
    }
}
exports.ConnectionDB = ConnectionDB;
