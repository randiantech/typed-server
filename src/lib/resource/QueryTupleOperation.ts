/**
 * List of QueryTuple operations. Used to determine the type of requested query
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export enum QueryTupleOperation {
    EQUALS,
    GREATER_THAN,
    LESSER_THAN,
    CONTAINS
}

export default QueryTupleOperation