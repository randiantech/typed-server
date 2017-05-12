import QueryTupleOperation from '../resource/QueryTupleOperation'

/**
 * Given an object key, extract the corresponding operation identifier.
 * In example, the key is eq_<KEY_NAME>, it extracts the identifier (_eq) and returns the corresponding operation
 * @param key the key from which the operation identifier will be analysed
 * @returns {QueryTupleOperation} A QueryTupleOperation (in example, EQUALS)
 */
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