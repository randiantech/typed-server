import Resource from '../resource/Resource'

export default class Response<T> {

    /**
     * Constructor
     * @param resources collection of resources
     * @param status HTTP status code
     */
    constructor(private resources: Resource<T>[], private total: number, private status: number) {
        this.resources = resources
        this.status = status
        this.total = total
    }

    getResources(): Resource<T>[] {
        return this.resources
    }

    getStatus(): number {
        return this.status
    }

    getTotal(): number {
        return this.total
    }
}