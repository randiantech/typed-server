import ApplicationException from '../error/ApplicationException'
import EmbeddedResource from './EmbeddedResource'
import Factory from '../common/Factory'
import Application from '../application/Application'
import { removeDuplicatedSlashes } from '../utils/utils'

/**
 * Abstract class required to be fully implemented by final resource classes. It provides a more strict resource
 * contract as well as common functionality required by any resource, in example, to fully generate a HAL representation
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
abstract class Resource<T> implements Factory<T>{

    /**
     * The id of the resource. Resource hierarchy enforces that every resource must have an id field
     */
    private id: string

    /**
     * the name of the resource
     */
    private name: string

    /**
     * constructor
     * @param name the name of the resource
     * @param id the id of the resource
     */
    constructor(name: string, id?: string) {
        this.id = id;
        this.name = name;
    }

    /**
     * @returns {string} the name of the resource
     */
    getName() {
        return this.name;
    }

    /**
     * @returns {string} the id of the resource
     */
    getId() {
        return this.id;
    }

    /**
     * Creates a HAL representation of a resource. Hal representations often require other database calls to fulfill
     * the representation (Particularly to execute queries for embedded resources)
     *
     * @param isRoot VERY IMPORTANT! This field denotes if the resource asking for the HAL representation is the original
     * one. This is important since we dont want to further expand HAL representation on embedded resources. This is
     * particularly import since it avoid circular dependency hell. In example:
     * Profile resource embeds a message collection of Message resources. Also, Message resource embeds a Profile
     * resource. If isRoot is not properly used, Message and Profile will enter on a circular dependency resolution
     * issue. Setting isRoot to true, embedded resources are not HAL representations (though, no _links and
     * no _embedded sections).
     *
     * @returns {{}} a Hal representation of the caller resource
     */
    async toHal(isRoot?: boolean) {
        let __this = this;
        let hal = {}
        if (!__this.id) {
            throw new ApplicationException(`A resource must contain an ID to be represented`);
        }

        Object.keys(__this).forEach((key) => {
            hal[key] = __this[key]
        });

        hal['_links'] = {}
        hal['_embedded'] = {}

        hal['_links'] = {
            self: removeDuplicatedSlashes(`${Application.HOST}/v${Application.API_VERSION}/${__this.getName()}/${__this.getId()}`)
        };

        if (isRoot) {
            for (var i = 0; i < __this.embeddeds().length; i++) {
                let embeddedResource = __this.embeddeds()[i]
                let service = Application.getServiceByName(embeddedResource.getResourceName())
                let res = await service.search(embeddedResource.getCriteria(), service.getResource())
                hal['_embedded'][embeddedResource.getName()] = res
            }
        }

        return hal
    }

    abstract create(obj: any): T

    abstract validate(obj: any)

    abstract embeddeds(): EmbeddedResource[]

}

export default Resource
