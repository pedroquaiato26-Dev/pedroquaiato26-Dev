import express, { Express, Request, Response } from 'express';
import { createHashSHA256 } from '../security/hash/hash-SHA512';
import { ConnectionDB } from '../database/connectionDB';
import {QuerysDinamicas} from '../database/Query/ChartsDashboard'
import { console } from 'inspector';

export class RouteLogin extends ConnectionDB {

    queryDinamicas: QuerysDinamicas
    constructor(app: Express) {
        super()

        this.queryDinamicas = new QuerysDinamicas(app)

    }

    async routeLogin(app: Express) {
        try {
            app.post('/api/send/dados/login', async (req: Request, res: Response): Promise<any> => {
                try {
                    
                    const dadosUser = {
                        email: req.body.email,
                        password: req.body.password
                    };
    
                    if (!dadosUser.email || !dadosUser.password) {
                        return res.status(400).json({ mensagem: 'Campos de email e senha são obrigatórios' });
                    }
    
                    const passwordCRY = createHashSHA256(dadosUser.password)
    
                    const isAuthorized = await this.AcessDashboard(dadosUser.email ,passwordCRY);
                    await this.PermissionUser(dadosUser.email)
    
                    if (!isAuthorized) {
                        return res.status(400).json({ mensagem: 'Email ou senha inválidos!' });
                    }                    
                    
                    return res.json({ mensagem: 'Login permitido' });
    
                } catch (error) {
                    console.error('Erro interno na API de logins:', {
                        email: req.body.email,
                        error: error
                    });
                    res.status(500).json({ mensagem: 'Erro interno ao processar o login' });
                }
            });
        } catch (error) {
            console.error('Erro ao utilizar a API de rotas de login:', error);
        }
    }
    
    public async AcessDashboard(email: string, password: string): Promise<boolean> {
        try {
            const SQLcommand = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
        
            const result = await this.modelQuery(SQLcommand, values);
            console.log('Resultado da consulta:', result); 
        
            if (result.rowCount === 0 || result[0].password !== password)  {
                return false;
            }
        
            return true; 
        
        } catch (error) {
            console.error('Erro ao acessar o dashboard devido a algum erro interno: ', error);
            return false; 
        }
    }

    public async PermissionUser(email: string): Promise<any> {
        try {
            const SQLcommand = 'SELECT permission, nome FROM users WHERE email = $1';
            const values = [email];
        
            const result = await this.modelQuery(SQLcommand, values);

            console.log(result)
    
            if (result.rowCount === 0) {
                return 'Usuário não encontrado'; 
            } else {
                
                const user = result[0];

                console.log(user);
    
                const dadosPermissionUser = {
                    nomeUser: user.nome,
                    permission: user.permission
                };

                console.log(dadosPermissionUser)
    
                this.queryDinamicas.MontagemMain(dadosPermissionUser.permission, dadosPermissionUser.nomeUser)
            }
        } catch (error) {
            console.error('Erro ao acessar as permissões do usuário:', error);
            return 'Erro interno';
        }
    }
    
}
