import Criteria from '../criteria/Criteria'

interface Repository<T> {

    /**
     * Gets Repository Name
     */
    getName(): string

    /**
     * Returns a collection of resources filtered by a provided criteria
     */
    search(criteria: Criteria, resource): Promise<T[]>

    /**
     * Returns a collection of resources filtered by a provided HTTP request
     */
    searchByRequest(request:any, resource): Promise<T[]>

    /**
     * Creates a resource instance
     */
    create(instance: T): T

    /**
     * Updates an existing instance
     */
    update(id: string, updatedInstance: T): T

    /**
     * Deletes an existing instance
     */
    delete(id: string): T

}

export default Repository