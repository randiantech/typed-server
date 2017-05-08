import AppLogEntry from '../error/AppLogEntry'
import AppLogType from '../error/AppLogType'
import EmbeddedResource from './EmbeddedResource'
import Transformable from '../repository/Transformable'
import Application from '../application/Application'
import { removeDuplicatedSlashes } from '../utils/utils'

abstract class Resource<T> implements Transformable<T>{

    /**
     * Id of the resource
     */
    id: string;

    /**
     * Name of the resource. In example: Profile
     */
    name: string;

    constructor(name: string, id?: string) {
        this.id = id;
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    async toHAL(isRoot?: boolean) {
        let __this = this;
        if (!__this.id) {
            throw new AppLogEntry(AppLogType.ERROR, `A resource must contain an ID to be represented`);
        }

        let hal = {
            _links: {},
            _embedded: {}
        };

        Object.keys(__this).forEach((key) => {
            hal[key] = __this[key]
        });

        hal._links = {
            self: removeDuplicatedSlashes(`${Application.HOST}/${Application.API_VERSION}/${__this.name}/${__this.id}`)
        };

        for (var i = 0; i < __this.embeddeds().length; i++) {
            let embeddedResource = __this.embeddeds()[i]
            let service = Application.getServiceByName(embeddedResource.getResourceName())
            let res = await service.search(embeddedResource.getCriteria())
            hal._embedded[embeddedResource.getName()] = res
        }

        return hal
    }

    abstract transform(obj: any): T

    abstract validate(obj: any)

    abstract embeddeds(): EmbeddedResource[]

}

export default Resource
