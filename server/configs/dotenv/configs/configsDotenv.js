"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfidDotenv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const config = {
    path: '/home/pedro.quaiato@intelidata.local/Área de Trabalho/Projeto-Dash/server/env/env.env',
    override: true
};
class ConfidDotenv {
    constructor() {
        this.configsDotenv(config.path, config.override);
    }
    configsDotenv(path, override) {
        try {
            return dotenv_1.default.config({ path: path, override: override });
        }
        catch (error) {
            console.error('Erro ao instanciar as configurações do DOTENV: ', error);
        }
    }
}
exports.ConfidDotenv = ConfidDotenv;
