import Message from '../resource/Message'
import PostgreRepository from '../lib/db/postgre/PostgreRepository'
import PostgresCriteria from '../lib/db/postgre/PostgreCriteria'
import Method from '../lib/constant/Method'
import Log from '../lib/error/Log'
import route from '../lib/annotation/route'
var __this;

export default class MessageService extends PostgreRepository<Message> {
    
    constructor() {
        super(Message.RESOURCE_NAME)
        __this = this
    }

    @route(Method.GET, '/profile/:profile_id/message')
    async searchForMessages(req, res, next) {
        try {
            let result = await __this.searchByRequest(req, Message.getPropertyType)
            let halResult = await result.toHAL()
            res.send(halResult)
        } catch (err) {
            res.send(Log(err))
        }
    }

    @route(Method.GET, '/profile/:profile_id/message/:message_id')
    async getMessageById(req, res, next) {
        try {
            let result = await __this.getById(req.params.message_id)
            let halResult = await result.toHAL()
            res.send(halResult)
        } catch (err) {
            res.send(Log(err))
        }
    }

    transform(obj: any): Message {
        return Message.transform(obj)
    }

    /**
     * Transforms the result from a repository to a typed Resource instance
     * @param obj A non typed, raw from DB profile 
     */
    static transform(obj: any): Message {
        return Message.transform(obj)
    }

    validate(obj: any) {
        Message.validate(obj)
    }

    static validate(obj: any) {
        Message.validate(obj)
    }
}