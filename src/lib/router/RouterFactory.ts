import * as express from 'express'
import Method from '../constant/Method'
const router = express.Router()

/**
 * Router Factory
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class RouterFactory {

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

    public static getRouter(): express.Router {
        return router;
    }
}