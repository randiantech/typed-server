import Criteria from '../../criteria/Criteria'
import QueryTuple from '../../resource/QueryTuple'
import QueryTupleOperation from '../../resource/QueryTupleOperation'
import MapperProvider from '../../mapper/MapperProvider'
import { resolveOperation, resolveKey } from '../../utils/utils.db'
import { resolveTupleOperation } from './utils.postgre'

/**
 * Implementation of a Criteria for Postgre databases. A criteria is capable to resolve to a parametrized query through
 * QueryTuples.
 */
export default class PostgreCriteria implements Criteria {

    tuples: QueryTuple[]

    /**
     * constructor
     * @param tuples list of tuples used to create a criteria
     */
    constructor(tuples: QueryTuple[]) {
        this.tuples = tuples
    }

    /**
     * @returns {QueryTuple[]} list of tuples
     */
    getTuples(): QueryTuple[] {
        return this.tuples
    }

    /**
     * A criteria object can be resolved and thus return a parametrized Postgre database query
     * @param tableName the name of the table where created query will be applied
     * @returns {{statement: string, totalsStatement: string, values: Array}}
     */
    resolve(tableName: string): { statement: string, totalsStatement: string, values: any } {
        let __this = this
        let statement = `SELECT * FROM ${tableName}`
        let totalsStatement = `SELECT COUNT(*) FROM ${tableName}`
        let whereStatement = ``
        let paginationStatement = ``
        let page
        let pageSize
        let values = []
        let fieldPosition = 0

        __this.tuples.forEach((tuple, idx) => {
            fieldPosition++
            switch (tuple.fieldName) {
                case 'page':
                case 'page_size':
                    if (tuple.fieldName === 'page_size') {
                        pageSize = tuple.fieldValue
                        paginationStatement += `LIMIT $${fieldPosition} `
                        values.push(pageSize)
                    }
                    if (tuple.fieldName === 'page') {
                        paginationStatement += `OFFSET $${fieldPosition} `
                        values.push((tuple.fieldValue - 1) * pageSize)
                    }
                    break

                default:
                    values.push(tuple.fieldValue)
                    let operation = resolveTupleOperation(tuple.operation)
                    tuple.operation === QueryTupleOperation.CONTAINS ? tuple.fieldValue = `%${tuple.fieldValue}%` : ''
                    whereStatement += `${tuple.fieldName}::${tuple.fieldType} ${resolveTupleOperation(tuple.operation)} $${fieldPosition}`
                    whereStatement += ` AND `
                    break
            }
        })


        whereStatement = whereStatement.substring(0, whereStatement.length - ` AND `.length)
        whereStatement ? statement += ` WHERE ${whereStatement}` : ''
        whereStatement ? totalsStatement += ` WHERE ${whereStatement}` : ''
        paginationStatement ? statement += ` ${paginationStatement} ` : ''
        paginationStatement ? totalsStatement += ` ${paginationStatement} ` : ''
        statement = statement.toUpperCase()
        totalsStatement = totalsStatement.toUpperCase()

        return { statement, totalsStatement, values }
    }

    /**
     * Creates a criteria instance using an HTTP request object, and a resource instance
     * @param request the HTTP request object from which data will be extracted to create criteria tuples
     * @param resource the resource used to resolve its corresponding mapper
     * @returns {PostgreCriteria} A postgre database criteria object
     */
    create(request: any, resource: any) {
        return PostgreCriteria.create(request, resource)
    }

    /**
     * Creates a criteria instance using an HTTP request object, and a resource instance
     * @param request the HTTP request object from which data will be extracted to create criteria tuples
     * @param resource the resource used to resolve its corresponding mapper
     * @returns {PostgreCriteria} A postgre database criteria object
     */
    static create(request: any, resource) {
        let tuples = []

        Object.keys(request.query).forEach((key) => {
            let mapping = MapperProvider.get(resource.name, resolveKey(key))
            let value = request.query[key]
            tuples.push(new QueryTuple(mapping.name, value, mapping.type, resolveOperation(key)))
        })

        return new PostgreCriteria(tuples)
    }
}
