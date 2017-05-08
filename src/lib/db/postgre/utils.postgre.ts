import QueryTupleOperation from '../../resource/QueryTupleOperation'

const props = require('../../utils/utils.props');
const pg = require('pg')
const pool = new pg.Pool(props().postgresql);

export function resolveTupleOperation(op: QueryTupleOperation) {
  switch (op) {
    //TODO Do the resolution for contains! :)
    case QueryTupleOperation.CONTAINS: return ''
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