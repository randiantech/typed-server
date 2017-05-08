import Criteria from '../../criteria/Criteria'
import AppLogEntry from '../../error/AppLogEntry'
import AppLogType from '../../error/AppLogType'
import Transformable from '../../repository/Transformable'
import QueryTuple from '../../resource/QueryTuple'
import QueryTupleOperation from '../../resource/QueryTupleOperation'
import { resolveOperation } from '../../utils/utils.db'
import { resolveTupleOperation } from './utils.postgre'

export default class PostgreCriteria implements Criteria {

    tuples: QueryTuple[]

    constructor(tuples: QueryTuple[]) {
        this.tuples = tuples
    }

    getTuples(): QueryTuple[] {
        return this.tuples
    }

    resolve(tableName?: string): { statement: string, values: any } {
        let __this = this
        let statement = `SELECT * FROM ${tableName}`
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
                    whereStatement += `${tuple.fieldName}::${tuple.fieldType}${resolveTupleOperation(tuple.operation)}$${fieldPosition}`
                    whereStatement += ` AND `
                    break
            }
        })


        whereStatement = whereStatement.substring(0, whereStatement.length - ` AND `.length)
        whereStatement ? statement += ` WHERE ${whereStatement}` : ''
        paginationStatement ? statement += ` ${paginationStatement} ` : ''
        statement = statement.toUpperCase()

        return { statement, values }
    }

    create(request: any, mapper: any) {
        return PostgreCriteria.create(request, mapper)
    }

    static create(request: any, mapper: any) {
        let tuples = []

        Object.keys(request.query).forEach((key) => {
            tuples.push(new QueryTuple(key, request.query[key], mapper(key), resolveOperation(key)))
        })

        return new PostgreCriteria(tuples)
    }
}
