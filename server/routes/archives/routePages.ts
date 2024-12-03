import express, { Express, Request, Response } from 'express'
import { pages } from './enum/pages'
import path from 'path'

export class RoutesPages{
    constructor(app: Express){

        this.loginPage(app)
        this.dashboardPage(app)

    }

    public loginPage(app: Express){
        try {
            app.get('/', (req: Request, res: Response) => {
                try {
                    res.sendFile(path.join(__dirname, pages.loginPage))
                } catch (error) {
                    console.error('Erro interno ao carregar a pagina: ', error)
                }
            })
        } catch (error) {
            console.error('Erro na função de carregamento da pagina: ', error)
        }
    }

    public dashboardPage(app: Express){
        try {
            app.get('/dashboard', (req: Request, res: Response) => {
                try {
                    res.sendFile(path.join(__dirname, pages.dashboard))
                } catch (error) {
                    console.error('Erro interno ao carregar a pagina: ', error)
                }
            })
        } catch (error) {
            console.error('Erro na função de carregamento da pagina: ', error)
        }
    }
}