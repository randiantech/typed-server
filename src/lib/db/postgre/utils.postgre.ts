import QueryTupleOperation from '../../resource/QueryTupleOperation'

const props = require('../../utils/utils.props');
const pg = require('pg')
const pool = new pg.Pool(props().postgresql);

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = (text, values, callback) => {
  return pool.query(text, values, callback);
};

module.exports.connect = (callback) => {
  return pool.connect(callback);
};

module.exports.resolveTuple = (op: QueryTupleOperation) => {
  switch (op) {
    case QueryTupleOperation.CONTAINS: return ''
    case QueryTupleOperation.EQUALS: return ''
    case QueryTupleOperation.GREATER_THAN: return ''
    case QueryTupleOperation.LESSER_THAN: return ''
  }
}

export function resolveOperation(key) {
  let _containsPrefix = (key) => {
    return !key || key[2] != '_' || key.length < 3
  }

  if (!_containsPrefix(key)) return QueryTupleOperation.EQUALS

  let opPrefix = key.substring(0, 3).toLowerCase()

  switch (opPrefix) {
    case 'eq': return QueryTupleOperation.EQUALS
    case 'gt': return QueryTupleOperation.GREATER_THAN
    case 'lt': return QueryTupleOperation.LESSER_THAN
    case 'ct': return QueryTupleOperation.CONTAINS
    default: return QueryTupleOperation.EQUALS
  }
}