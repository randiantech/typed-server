import RouterFactory from '../router/RouterFactory'
import Method from '../constant/Method'

export default function route(verb:Method, urls:string[] | string) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        RouterFactory.create(verb, urls, target[propertyKey]);
    }
}