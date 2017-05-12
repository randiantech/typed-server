import QueryTuple from '../resource/QueryTuple'

/**
 * Abstract class used by Criteria classes.
 */
abstract class Criteria {

    /**
     * Gets the list of tuples from which criteria will be constructed
     */
    abstract getTuples(): QueryTuple[]

    /**
     * Resolves a criteria object, using tuples, generating a parametrized statement with its corresponding values, 
     * as well as separate statement to get total of results
     * @param tableName the name of the table
     */
    abstract resolve(tableName: string): { statement: string, totalsStatement: string, values: any }

    /**
     * Creates a Criteria instance
     * @param request the request object from which data will be extracted to construct criteria QueryTuples
     * @param resource the resource to which criteria will be applied
     */
    abstract create(request: any, resource:any): any
}

export default Criteria