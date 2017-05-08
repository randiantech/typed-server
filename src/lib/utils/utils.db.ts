import QueryTupleOperation from '../resource/QueryTupleOperation'

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