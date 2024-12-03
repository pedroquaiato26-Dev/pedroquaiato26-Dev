import {RouteLogin} from '../routeLogin'
import { Express } from 'express'

export class MainRoute {
    
    constructor(app: Express){
        
        const login = new RouteLogin(app)
        login.routeLogin(app)
        
    }
}