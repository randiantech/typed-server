import QueryTupleOperation from '../resource/QueryTupleOperation'

/**
 * Given an object key, extract the corresponding operation identifier.
 * In example, the key is eq_<KEY_NAME>, it extracts the identifier (_eq) and returns the corresponding operation
 * @param key the key from which the operation identifier will be analysed
 * @returns {QueryTupleOperation} A QueryTupleOperation (in example, EQUALS)
 */
export function resolveOperation(key) {
  if (!containsOperationPrefix(key)) return QueryTupleOperation.EQUALS

  let opPrefix = key.substring(0, 2).toLowerCase()

  switch (opPrefix) {
    case 'eq': return QueryTupleOperation.EQUALS
    case 'gt': return QueryTupleOperation.GREATER_THAN
    case 'lt': return QueryTupleOperation.LESSER_THAN
    case 'ct': return QueryTupleOperation.CONTAINS
    default: return QueryTupleOperation.EQUALS
  }
}

export function containsOperationPrefix(key) {
  return key.startsWith('eq_') || key.startsWith('gt_') || key.startsWith('lt_') || key.startsWith('ct_')
}


export function resolveKey(key) {
  if (containsOperationPrefix(key)) {
    return key.substring(3, key.length)
  } else {
    return key
  }
}