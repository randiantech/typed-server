import Resource from '../resource/Resource'

export default class Response<T> {

    private resources: Resource<T>[]
    private total: number 

    constructor(resources, total){
        this.resources = resources
        this.total = total
    }

    getResources(): Resource<T>[]{
        return this.resources
    }

    getTotal(): any {
        return this.total
    }
}