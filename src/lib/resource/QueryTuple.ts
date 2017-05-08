import AppLogEntry from '../error/AppLogEntry'
import AppLogType from '../error/AppLogType'
import Transformable from '../repository/Transformable'
import QueryTupleOperation from './QueryTupleOperation'

export default class QueryTuple {


    fieldName: string
    fieldValue: string | string[] | number | number[]
    fieldType: string
    operation: QueryTupleOperation

    constructor(fieldName: string, fieldValue: string | string[] | number | number[], fieldType: string, operation: QueryTupleOperation) {
        this.fieldName = fieldName
        this.fieldValue = fieldValue
        this.fieldType = fieldType
        this.operation = operation
    }

    getFieldName(): string {
        return this.fieldName
    }

    getFieldValue(): string | string[] | number | number[] {
        return this.fieldValue
    }

    getFieldType(): string {
        return this.fieldType
    }

    getOperation(): QueryTupleOperation {
        return this.operation
    }

}
