import Criteria from '../criteria/Criteria'

export default class EmbeddedResource {

    name: string
    resourceName: string
    criteria: Criteria

    constructor(name, resourceName, criteria) {
        this.name = name
        this.resourceName = resourceName
        this.criteria = criteria
    }

    getName(): string {
        return this.name
    }

    getCriteria(): Criteria {
        return this.criteria
    }

    getResourceName(): string {
        return this.resourceName
    }
}
