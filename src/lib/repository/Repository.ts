import Criteria from '../criteria/Criteria'
import Response from './Response'

interface Repository<T> {

    /**
     * Gets Repository Name
     */
    getName(): string

    /**
     * Returns a collection of resources filtered by a provided criteria
     */
    search(criteria: Criteria, resource): Promise<Response<T[]>>

    /**
     * Returns a collection of resources filtered by a provided HTTP request
     */
    searchByRequest(request: any, resource): Promise<Response<T[]>>

    /**
     * Creates a resource instance
     */
    create(values: object): Promise<Response<T>>

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