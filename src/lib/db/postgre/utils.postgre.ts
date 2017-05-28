import QueryTupleOperation from '../../resource/QueryTupleOperation'
import MapperProvider from '../../mapper/MapperProvider'

const props = require('../../utils/utils.props');
const pg = require('pg')
const pool = new pg.Pool(props().postgresql);

/**
 * Given a QueryTupleOperation, resolves to the corresponding Postgres operator
 * @param op QueryTupleOperation
 * @returns {any} the corresponding operator to be used on query
 */
export function resolveTupleOperation(op: QueryTupleOperation) {
  switch (op) {
    case QueryTupleOperation.CONTAINS: return 'LIKE'
    case QueryTupleOperation.EQUALS: return '='
    case QueryTupleOperation.GREATER_THAN: return '>'
    case QueryTupleOperation.LESSER_THAN: return '<'
  }
}

/**
 * Creates an string of query placeholders.
 * IE: Given quantity=N => $1,$2,$3,...$N
 * Particularly handy when creating Insert queries using prepared statements
 * @param quantity number of parameters
 * @return An string $1,..$N where N=quantity
 */
export function createStringOfPlaceholders(quantity: number) {
  let val = ``
  for (var i = 1; i <= quantity; i++) {
    val += `$${i},`
  }
  return val.slice(0, -1)
}

export function createInsertSqlQuery(resourceName, vals: any): { statement: string, values: Array<any> } {
  let values = []
  let statementValues = []
  
  Object.keys(vals).forEach((value) => {
    statementValues.push(MapperProvider.get(resourceName, value).name)
    values.push(vals[value])
  })

  let p = createStringOfPlaceholders(values.length)
  let statement = `INSERT INTO ${resourceName}(${statementValues.toString()}) VALUES (${p})`

  return { statement, values }
}

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = (text, values, callback) => {
  return pool.query(text, values, callback);
};

module.exports.connect = (callback) => {
  return pool.connect(callback);
};