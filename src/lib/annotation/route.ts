import RouterFactory from '../router/RouterFactory'
import Method from '../constant/Method'

export default function route(verb:Method, url:string) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        RouterFactory.create(verb, url, target[propertyKey]);
    }
}