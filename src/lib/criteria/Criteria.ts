import QueryTuple from '../resource/QueryTuple'
import QueryTupleOperation from '../resource/QueryTupleOperation'

abstract class Criteria {
    abstract getTuples(): QueryTuple[]
    abstract resolve(): { statement, values }
    abstract create(request: any, mapper:any): any
}

export default Criteria