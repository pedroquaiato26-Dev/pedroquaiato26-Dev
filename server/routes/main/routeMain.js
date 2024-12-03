"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoute = void 0;
const routeLogin_1 = require("../routeLogin");
class MainRoute {
    constructor(app) {
        const login = new routeLogin_1.RouteLogin(app);
        login.routeLogin(app);
    }
}
exports.MainRoute = MainRoute;
