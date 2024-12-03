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
exports.RouteLogin = void 0;
const hash_SHA512_1 = require("../security/hash/hash-SHA512");
const connectionDB_1 = require("../database/connectionDB");
const ChartsDashboard_1 = require("../database/Query/ChartsDashboard");
const inspector_1 = require("inspector");
class RouteLogin extends connectionDB_1.ConnectionDB {
    constructor(app) {
        super();
        this.queryDinamicas = new ChartsDashboard_1.QuerysDinamicas(app);
    }
    routeLogin(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                app.post('/api/send/dados/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const dadosUser = {
                            email: req.body.email,
                            password: req.body.password
                        };
                        if (!dadosUser.email || !dadosUser.password) {
                            return res.status(400).json({ mensagem: 'Campos de email e senha são obrigatórios' });
                        }
                        const passwordCRY = (0, hash_SHA512_1.createHashSHA256)(dadosUser.password);
                        const isAuthorized = yield this.AcessDashboard(dadosUser.email, passwordCRY);
                        yield this.PermissionUser(dadosUser.email);
                        if (!isAuthorized) {
                            return res.status(400).json({ mensagem: 'Email ou senha inválidos!' });
                        }
                        return res.json({ mensagem: 'Login permitido' });
                    }
                    catch (error) {
                        inspector_1.console.error('Erro interno na API de logins:', {
                            email: req.body.email,
                            error: error
                        });
                        res.status(500).json({ mensagem: 'Erro interno ao processar o login' });
                    }
                }));
            }
            catch (error) {
                inspector_1.console.error('Erro ao utilizar a API de rotas de login:', error);
            }
        });
    }
    AcessDashboard(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQLcommand = 'SELECT * FROM users WHERE email = $1';
                const values = [email];
                const result = yield this.modelQuery(SQLcommand, values);
                inspector_1.console.log('Resultado da consulta:', result);
                if (result.rowCount === 0 || result[0].password !== password) {
                    return false;
                }
                return true;
            }
            catch (error) {
                inspector_1.console.error('Erro ao acessar o dashboard devido a algum erro interno: ', error);
                return false;
            }
        });
    }
    PermissionUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQLcommand = 'SELECT permission, nome FROM users WHERE email = $1';
                const values = [email];
                const result = yield this.modelQuery(SQLcommand, values);
                inspector_1.console.log(result);
                if (result.rowCount === 0) {
                    return 'Usuário não encontrado';
                }
                else {
                    const user = result[0];
                    inspector_1.console.log(user);
                    const dadosPermissionUser = {
                        nomeUser: user.nome,
                        permission: user.permission
                    };
                    inspector_1.console.log(dadosPermissionUser);
                    this.queryDinamicas.MontagemMain(dadosPermissionUser.permission, dadosPermissionUser.nomeUser);
                }
            }
            catch (error) {
                inspector_1.console.error('Erro ao acessar as permissões do usuário:', error);
                return 'Erro interno';
            }
        });
    }
}
exports.RouteLogin = RouteLogin;
