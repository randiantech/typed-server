import { injectIdParams, toQueryString, removeDuplicatedSlashes } from '../utils/utils'
import Application from '../application/Application'

export default class HalHandler {

    /**
     * Given a list of HAL resources, creates a HAL collection of them
     * @param resources the list of the resources to be added to the 
     * @returns {{_embedded: {items: Array}, _links: {}}}
     */
    static async toHalCollection(resources, total, req) {
        let halCollection = {
            _embedded: {
                items: []
            },
            _links: {
                "total_results": total,
                "page_size": parseInt(req.query['page_size']),
                "total_pages": total / parseInt(req.query['page_size']) < 1 ? 1 : total / total / parseInt(req.query['page_size']),
                "current_page": removeDuplicatedSlashes(`${Application.HOST}/v${Application.API_VERSION}/${req.path}${toQueryString(req)}`)
            },
        }
        for (var i = 0; i < resources.length; i++) {
            let r = await resources[i].toHal(true)
            halCollection._embedded.items.push(r)
        }

        return halCollection
    }

    /**
     * Given a resource service, an HTTP request, an HTTP response handler and a resource, processes it
     * @param service the resource service
     * @param req the HTTP request object
     * @param res the HTTP response object
     * @param resource a resource
     */
    static async process(service, req, res, resource) {
        injectIdParams(req)
        try {
            let response = await service.searchByRequest(req, resource)
            if (req.params.id) {
                let r = await response.getResources()[0].toHal(true)
                res.send(r)
            } else {
                let halCollection = await HalHandler.toHalCollection(response.getResources(), response.getTotal(), req)
                res.send(halCollection)
            }
        } catch (err) {
            res.send(err.toHal())
        }
    }
}
