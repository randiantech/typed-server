import Message from '../resource/Message'
import PostgreRepository from '../lib/db/postgre/PostgreRepository'
import Method from '../lib/constant/Method'
import route from '../lib/annotation/route'
import HalHandler from '../lib/hal/HalHandler'
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
    @route(Method.GET, ['/profile/:profileId/message', '/profile/:profileId/message/:id'])
    async searchForMessages(req, res, next) {
        HalHandler.process(__this, req, res, Message)
    }
}