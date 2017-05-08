import Transformable from './Transformable'
import Resource from '../resource/Resource'
import Criteria from '../criteria/Criteria'

interface Repository<T> extends Transformable<T> {

    /**
     * Gets Repository Name
     */
    getName(): string

    /**
     * Returns a collection of resources filtered by a provided criteria
     */
    search(criteria: Criteria): Promise<T[]>

    /**
     * Returns a collection of resources filtered by a provided HTTP request
     */
    searchByRequest(request:any, mapper:any): Promise<T[]>

    /**
     * Gets a resource instance by ID
     */
    getById(id: string): Promise<T>

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