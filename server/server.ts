import express, {Express, Request, Response, application} from 'express'
import {RoutesPages} from './routes/archives/routePages'
import {MainRoute} from './routes/main/routeMain'
const cors = require('cors');


const path = require('path')

class PrincipalServer { 
    
    constructor(){

        const app = express()
        this.middlewares(app)
        this.routesServer(app)
        this.routesPages(app)

        this.appInicialized(app)
    }

    public middlewares(app: Express){
        try {
            app.use(express.json());
            app.use(cors());
            this.arquivesStatics(app)
        } catch (error) {
            console.error('Erro ao carregar os middleswares do servidor: ', error)
        }
    }
    public arquivesStatics(app: Express){
        try {
            app.use('/public', express.static(path.join(__dirname, 'public')))
            app.use('/style', express.static(path.join(__dirname, '../public/style')))
            app.use('/src', express.static(path.join(__dirname, '../public/src')))
        } catch (error) {
            console.error('Erro ao carregar os arquivos estaticos: ', error)
        }
    }

    public routesServer(app: Express){
        try {
            const mainRoutes = new MainRoute(app)
            return mainRoutes
        } catch (error) {
            console.error('Erro ao inicializar as rotas do servidor: ', error)
        }
    }

    public routesPages(app: Express){
        try {
            const mainRoutePages = new RoutesPages(app)
        } catch (error) {
            console.error('Erro ao inicializar as rotas paras as paginas: ', error)
        }
    }

    public appInicialized(app: Express){
        try {
            app.listen(3000, () => {
                console.log('Servidor rodando na porta 3000')
            })
        } catch (error) {
            console.error('Falha critica ao iniciar servidor !', error)
        }
    }
}

const main = new PrincipalServer()