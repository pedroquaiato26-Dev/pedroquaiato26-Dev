"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routePages_1 = require("./routes/archives/routePages");
const routeMain_1 = require("./routes/main/routeMain");
const cors = require('cors');
const path = require('path');
class PrincipalServer {
    constructor() {
        const app = (0, express_1.default)();
        this.middlewares(app);
        this.routesServer(app);
        this.routesPages(app);
        this.appInicialized(app);
    }
    middlewares(app) {
        try {
            app.use(express_1.default.json());
            app.use(cors());
            this.arquivesStatics(app);
        }
        catch (error) {
            console.error('Erro ao carregar os middleswares do servidor: ', error);
        }
    }
    arquivesStatics(app) {
        try {
            app.use('/public', express_1.default.static(path.join(__dirname, 'public')));
            app.use('/style', express_1.default.static(path.join(__dirname, '../public/style')));
            app.use('/src', express_1.default.static(path.join(__dirname, '../public/src')));
        }
        catch (error) {
            console.error('Erro ao carregar os arquivos estaticos: ', error);
        }
    }
    routesServer(app) {
        try {
            const mainRoutes = new routeMain_1.MainRoute(app);
            return mainRoutes;
        }
        catch (error) {
            console.error('Erro ao inicializar as rotas do servidor: ', error);
        }
    }
    routesPages(app) {
        try {
            const mainRoutePages = new routePages_1.RoutesPages(app);
        }
        catch (error) {
            console.error('Erro ao inicializar as rotas paras as paginas: ', error);
        }
    }
    appInicialized(app) {
        try {
            app.listen(3000, () => {
                console.log('Servidor rodando na porta 3000');
            });
        }
        catch (error) {
            console.error('Falha critica ao iniciar servidor !', error);
        }
    }
}
const main = new PrincipalServer();
