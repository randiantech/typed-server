import RouterFactory from '../router/RouterFactory'
import Method from '../constant/Method'

/**
 * Method level decorator responsible to attach routes to resource services.
 * @param verb the HTTP verb (GET, PUT, POST, etc...)
 * @param urls A list or a single url matching pattern. In example: /person/:id
 */
export default function route(verb:Method, urls:string[] | string) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        RouterFactory.create(verb, urls, target[propertyKey]);
    }
}