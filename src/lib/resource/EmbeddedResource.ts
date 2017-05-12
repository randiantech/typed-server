import Criteria from '../criteria/Criteria'

/**
 * An embedded resource is a resource linked to another resource. Its represented on _embedded key of a HAL resource
 * representation
 *
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class EmbeddedResource {

    name: string
    resourceName: string
    criteria: Criteria

    /**
     * constructor
     * @param name the name to be used as key on the _embedded section of the container resource
     * @param resourceName the name of the resource that will contain it
     * @param criteria the criteria object used to generate the corresponding query
     */
    constructor(name, resourceName, criteria) {
        this.name = name
        this.resourceName = resourceName
        this.criteria = criteria
    }

    /**
     * @returns {string} the name used as key on the _embedded section of the container resource
     */
    getName(): string {
        return this.name
    }

    /**
     * @returns {Criteria} the criteria to be used to generate the query
     */
    getCriteria(): Criteria {
        return this.criteria
    }

    /**
     * @returns {string} The name of the resource that will contain the embedded resource
     */
    getResourceName(): string {
        return this.resourceName
    }
}
