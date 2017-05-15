import QueryTupleOperation from '../../resource/QueryTupleOperation'

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

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = (text, values, callback) => {
  return pool.query(text, values, callback);
};

module.exports.connect = (callback) => {
  return pool.connect(callback);
};