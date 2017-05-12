import { injectIdParams } from '../utils/utils'

export default class HalHandler {

    /**
     * Given a list of HAL resources, creates a HAL collection of them
     * @param resources
     * @returns {{_embedded: {items: Array}, _links: {}}}
     */
    static async toHalCollection(resources) {
        let halCollection = {
            _embedded: {
                items: []
            },
            _links: {},
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
            let result = await service.searchByRequest(req, resource)
            if (req.params.id) {
                let r = await result[0].toHal(true)
                res.send(r)
            } else {
                let halCollection = await HalHandler.toHalCollection(result)
                res.send(halCollection)
            }
        } catch (err) {
            res.send(err.toHal())
        }
    }
}
