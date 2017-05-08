import * as express from 'express'
import Method from '../constant/Method'
const router = express.Router()

/**
 * Router Factory
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class RouterFactory {

    public static create(method: Method, url: string, handler: any) {
        switch (method) {
            case Method.GET:
                router.get(url, handler);
                break;
            case Method.POST:
                router.post(url, handler);
                break
            case Method.PUT:
                router.put(url, handler);
                break
            case Method.DELETE:
                router.delete(url, handler);
                break
        }
    }

    public static getRouter(): express.Router {
        return router;
    }
}