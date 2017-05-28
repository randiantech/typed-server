import Resource from '../../resource/Resource'
import PostgreCriteria from './PostgreCriteria'
import Repository from '../../repository/Repository'
import Response from '../../repository/Response'
import ApplicationException from '../../error/ApplicationException'
import { createStringOfPlaceholders, createInsertSqlQuery } from './utils.postgre'
const pool = require('./utils.postgre')

/**
 * PostgreSql Repository. Used to provide resource services with operations to interact with a Postgre database
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
abstract class PostgreRepository<T extends Resource<T>> implements Repository<T> {

    name: string;

    /**
     * constructor
     * @param name the name of the resource
     */
    constructor(name) {
        this.name = name
    }

    /**
     * @returns {string} the name of the resource
     */
    getName(): string {
        return this.name
    }

    /**
     * Given an HTTP request and a resource, returns the response to a given query (resolved using a proper criteria)
     * @param request the HTTP request used to create the criteria that will be used to generate the query to be executed
     * @param resource the resource
     * @returns {T[]} A future list of T type resources obtained from repository through a criteria generate query
     */
    async searchByRequest(request: any, resource): Promise<Response<T[]>> {
        let criteria = PostgreCriteria.create(request, resource)
        let res = await this.search(criteria, resource)
        return res
    }

    /**
     * Given a criteria and a resource, executes a search query
     * @param criteria criteria object used to generate the query to be executed
     * @param resource the resource
     * @returns {Array} list of future resources of type T obtained from repository through a criteria generated query
     */
    async search(criteria: PostgreCriteria, resource: T): Promise<Response<T[]>> {
        let resolvedCriteria
        resolvedCriteria = criteria.resolve(this.getName())
        let res, tot
        try {
            res = await pool.query(resolvedCriteria.statement, resolvedCriteria.values)
            tot = await pool.query(resolvedCriteria.totalsStatement, resolvedCriteria.values)
        } catch (e) {
            throw new ApplicationException(e.message)
        }
        let resources = []
        res.rows.forEach((row) => {
            resources.push(resource.create(row))
        })
        return new Response<T[]>(resources, parseInt(tot.rows[0].count), 200)
    }

    /**
     * @param values
     */
    async create(values: object): Promise<Response<T>> {
        let q = createInsertSqlQuery(this.getName(), values)
        let res = await pool.query(q.statement, q.values)
        return new Response<T>(null, 1, 1)


        //TODO This is hardcoded for the sake of MVP. Needs rework!
        // let p = createStringOfPlaceholders(Object.keys(values).length)
        // let keys = Object.keys(values).toString()
        // let res = await pool.query(`INSERT INTO ${this.getName()}(value, profileid, date) VALUES ($1,$2,$3)`, [values['value'], values['profileid'], new Date().getTime()])
        // return new Response<T>(null, 1, 1)
    }

    update(id: string, updatedInstance: T): T {
        throw new Error('Method not implemented.');
    }

    delete(id: string): T {
        throw new Error('Method not implemented.');
    }
}

export default PostgreRepository