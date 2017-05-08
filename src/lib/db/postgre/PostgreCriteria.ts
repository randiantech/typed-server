import Criteria from '../../criteria/Criteria'
import AppLogEntry from '../../error/AppLogEntry'
import AppLogType from '../../error/AppLogType'
import Transformable from '../../repository/Transformable'
import QueryTuple from '../../resource/QueryTuple'
import QueryTupleOperation from '../../resource/QueryTupleOperation'
import { resolveOperation } from './utils.postgre'

export default class PostgreCriteria implements Criteria {

    tuples: QueryTuple[]

    constructor(tuples: QueryTuple[]) {
        this.tuples = tuples
    }

    getTuples(): QueryTuple[] {
        return this.tuples
    }

    resolve(): { statement: string, values: any } {
        let statement = ` `
        let values = []

        this.tuples.forEach((tuple, idx) => {
            let fieldPosition = idx + 1
            values.push(tuple.fieldValue)
            //TODO In next line, equals is hardcoded. Based on Op type, it would transform criteria statement
            statement += `${tuple.fieldName}::${tuple.fieldType}=$${fieldPosition}`
            this.tuples.length < idx ? statement += ` AND ` : ''
        })

        return { statement, values }
    }

    create(request: any, mapper: any) {
        return PostgreCriteria.create(request, mapper)
    }

    static create(request: any, mapper: any) {
        let tuples = []

        Object.keys(request.query).forEach((key) => {
            tuples.push(new QueryTuple(key, request.query.key, mapper(request.query.key), resolveOperation(key)))
        })

        //TODO Add logic to extract req.params!

        return new PostgreCriteria(tuples)
    }
}
