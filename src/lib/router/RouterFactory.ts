import * as express from 'express'
import Method from '../constant/Method'
const router = express.Router()

/**
 * Router Factory is responsible to create routes for resource services
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class RouterFactory {

    /**
     * Creates a route for the given HTTP method + url(s) combination
     * @param method HTTP method
     * @param urls list of (or single) url(s) where route will be binded
     * @handler Function that will handle the route execution
     */
    public static create(method: Method, urls: string[] | string, handler: any) {
        switch (method) {
            case Method.GET:
                router.get(urls, handler);
                break;
            case Method.POST:
                router.post(urls, handler);
                break
            case Method.PUT:
                router.put(urls, handler);
                break
            case Method.DELETE:
                router.delete(urls, handler);
                break
        }
    }

    /**
     * Returns an instance of an express router object
     */
    public static getRouter(): express.Router {
        return router;
    }
}