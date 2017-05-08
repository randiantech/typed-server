import Resource from '../../resource/Resource'
import PostgreCriteria from './PostgreCriteria'
import Repository from '../../repository/Repository'
import AppLogEntry from '../../error/AppLogEntry'
import AppLogType from '../../error/AppLogType'
const pool = require('./utils.postgre')

/**
 * PostgreSql Repository
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
abstract class PostgreRepository<T extends Resource<T>> implements Repository<T> {

    name: string;

    constructor(name) {
        this.name = name
    }

    getName(): string {
        return this.name
    }

    async searchByRequest(request:any, mapper:any): Promise<T[]> {
        let criteria = PostgreCriteria.create(request, mapper)
        let res = await this.search(criteria)
        return res
    }

    async search(criteria: PostgreCriteria): Promise<T[]> {
       let __this = this
       let resolvedCriteria
       try {
            resolvedCriteria = criteria.resolve(this.getName())
            let res = await pool.query(resolvedCriteria.statement, resolvedCriteria.values)
            if (res.rows.length === 0) {
                throw new AppLogEntry(AppLogType.INFO, `Does not exist any ${this.getName()}`)
            } else {
                let _res = []
                let rows = res['rows']
                rows.forEach((row) => {
                    _res.push(__this.transform(row))
                })
                return _res
            }
        } catch (err) {
            throw new AppLogEntry(AppLogType.ERROR, `Failed to execute PostgreRepository.search(${JSON.stringify(resolvedCriteria)})`)
        } 
    }

    create(instance: T): T {
        throw new Error('Method not implemented.');
    }

    update(id: string, updatedInstance: T): T {
        throw new Error('Method not implemented.');
    }

    delete(id: string): T {
        throw new Error('Method not implemented.');
    }

    abstract transform(obj: any): T

    abstract validate(obj: any)
}

export default PostgreRepository