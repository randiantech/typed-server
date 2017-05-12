/**
 * Given an url as an string, removes duplicated slashes from it. 
 * Example:
 * http://www.google.com// -> http://www.google.com/
 * @param url url to which duplicated slashes will be removed from
 */
export function removeDuplicatedSlashes(url: string) {
    return url.replace(/([^:]\/)\/+/g, "$1");
}

/**
 * Injects named parameters as query params
 * @param req HTTP request
 * 
 * //TODO this is not ideal. I need to somehow implement a decorator that executes
 * //TODO each and every time before a @route annotated method.
 */
export function injectIdParams(req) {
    Object.keys(req.params).forEach((paramName) => {
        if (req.params[paramName]) req.query[paramName] = req.params[paramName]
    })
}

export function toQueryString(req) {
    let queryString = '?'
    Object.keys(req.query).forEach((val) => {
        queryString += `${val}=${req.query[val]}&`
    })
    queryString = queryString.slice(0, -1)
    return removeDuplicatedSlashes(queryString)
}