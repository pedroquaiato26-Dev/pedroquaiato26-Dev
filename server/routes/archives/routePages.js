"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesPages = void 0;
const pages_1 = require("./enum/pages");
const path_1 = __importDefault(require("path"));
class RoutesPages {
    constructor(app) {
        this.loginPage(app);
        this.dashboardPage(app);
    }
    loginPage(app) {
        try {
            app.get('/', (req, res) => {
                try {
                    res.sendFile(path_1.default.join(__dirname, pages_1.pages.loginPage));
                }
                catch (error) {
                    console.error('Erro interno ao carregar a pagina: ', error);
                }
            });
        }
        catch (error) {
            console.error('Erro na função de carregamento da pagina: ', error);
        }
    }
    dashboardPage(app) {
        try {
            app.get('/dashboard', (req, res) => {
                try {
                    res.sendFile(path_1.default.join(__dirname, pages_1.pages.dashboard));
                }
                catch (error) {
                    console.error('Erro interno ao carregar a pagina: ', error);
                }
            });
        }
        catch (error) {
            console.error('Erro na função de carregamento da pagina: ', error);
        }
    }
}
exports.RoutesPages = RoutesPages;
