import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as root from 'app-root-path';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import RouterFactory from '../router/RouterFactory'
import Repository from '../repository/Repository'
import Resource from '../resource/Resource'
var _services = {}
const app = express()

/**
 * Application Bootstrap class in charge of creating the http server
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class Application {

    public static DEFAULT_PORT = 3000
    public static DEFAULT_PAGE = 1
    public static DEFAULT_PAGE_SIZE = 50
    public static API_VERSION
    public static HOST

    services: any[]

    constructor(services: any[], port?: number, version?: number, host?: string) {
        version ? Application.API_VERSION = version : 'v1'
        host ? Application.HOST = host : ''

        //TODO This middlewares would be optional / configurable
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        //TODO This middlewares would be optional / configurable

        app.use(this.injectPaginationParams)

        app.use(`/v${version}`, RouterFactory.getRouter());
        app.set('port', port || Application.DEFAULT_PORT);

        const server = http.createServer(app);
        server.listen(port || Application.DEFAULT_PORT);

        server.on('listening', () => {
            const addr = server.address();
            const bind = (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`);
        });

        services.forEach((service) => {
            _services[service.getName()] = service
        })
    }

    injectPaginationParams(req, res, next) {
        !req.query['page_size'] ? req.query['page_size'] = Application.DEFAULT_PAGE_SIZE : ''
        !req.query['page'] ? req.query['page'] = Application.DEFAULT_PAGE : ''
        return next()
    }

    public static getServiceByName(name: string) {
        return _services[name]
    }
}