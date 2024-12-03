"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractionCredentials = void 0;
const configsDotenv_1 = require("../configs/configsDotenv");
class ExtractionCredentials extends configsDotenv_1.ConfidDotenv {
    constructor() {
        super();
    }
    extractionCredentials() {
        try {
            const Credentials = {
                username: process.env.USERGNIO,
                password: process.env.PASSWORDGNIO,
                database: process.env.DATABASEDASHBOARD,
                host: process.env.HOSTGNIO,
                port: Number(process.env.PORTGNIO)
            };
            return Credentials;
        }
        catch (error) {
            console.error('Erro ao realizar as extrações das credencias');
        }
    }
}
exports.ExtractionCredentials = ExtractionCredentials;
