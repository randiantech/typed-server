import Message from '../resource/Message'
import PostgreRepository from '../lib/db/postgre/PostgreRepository'
import Method from '../lib/constant/Method'
import route from '../lib/annotation/route'
import RequestPreProcessor from '../lib/hal/RequestPreProcessor'
var __this;

/**
 * Service for Message resource
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class MessageService extends PostgreRepository<Message> {

    /**
     * constructor
     */
    constructor() {
        super(Message.RESOURCE_NAME)
        __this = this
    }

    /**
     * @returns {Message} the resource to which this service is bind to
     */
    getResource() {
        return Message
    }

    /**
     * HTTP route
     * @param req HTTP request
     * @param res HTTP response
     * @param next callback handler
     */
    @route(Method.GET, ['/profile/:profileId/message', '/profile/:profileId/message/:id', '/message'])
    async searchForMessages(req, res, next) {
        RequestPreProcessor.search(__this, req, res, Message)
    }

    @route(Method.POST, '/message')
    async createMessage(req, res, next) {
        req.body['date'] = new Date().getTime()
        let response = await __this.create(req.body)
        res.send('created')
    }
}