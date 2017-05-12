import QueryTupleOperation from './QueryTupleOperation'

/**
 * A QueryTuple represents an statement used to create a search query
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class QueryTuple {


    fieldName: string
    fieldValue: string | string[] | number | number[] | any
    fieldType: string
    operation: QueryTupleOperation

    /**
     * constructor
     * @param fieldName the name of the field that needs to be queried
     * @param fieldValue the value of the field that needs to be queried
     * @param fieldType the type of the field
     * @param operation the operation (check QueryTupleOperation class) hold on this QueryTuple
     */
    constructor(fieldName: string, fieldValue: string | string[] | number | number[] | any, fieldType: string, operation: QueryTupleOperation) {
        this.fieldName = fieldName
        this.fieldValue = fieldValue
        this.fieldType = fieldType
        this.operation = operation
    }

    /**
     * @returns {string} the name of the field that needs to be queried
     */
    getFieldName(): string {
        return this.fieldName
    }

    /**
     * @returns {string|string[]|number|number[]|any} the value of the field that needs to be queried
     */
    getFieldValue(): string | string[] | number | number[] | any {
        return this.fieldValue
    }

    /**
     * @returns {string} the type of the field
     */
    getFieldType(): string {
        return this.fieldType
    }

    /**
     * @returns {QueryTupleOperation} the operation (check QueryTupleOperation class) hold on this QueryTuple
     */
    getOperation(): QueryTupleOperation {
        return this.operation
    }

}
