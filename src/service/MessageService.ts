import Message from '../resource/Message'
import PostgreRepository from '../lib/db/postgre/PostgreRepository'
import PostgresCriteria from '../lib/db/postgre/PostgreCriteria'
import Method from '../lib/constant/Method'
import route from '../lib/annotation/route'
import { injectIdParams } from '../lib/utils/utils'
var __this;

export default class MessageService extends PostgreRepository<Message> {

    constructor() {
        super(Message.RESOURCE_NAME)
        __this = this
    }

    @route(Method.GET, ['/profile/:profileId/message', '/profile/:profileId/message/:id'])
    async searchForMessages(req, res, next) {
        injectIdParams(req)
        try {
            let result = await __this.searchByRequest(req, Message.getPropertyType)
            if (req.params.id) {
                let r = await result[0].toHAL()
                res.send(r)
            } else {
                //TODO the response is actually not a HAL collection based on standard; just an Array
                let halResult = []
                for(var i = 0; i < result.length; i++){
                    let r = await result[i].toHAL()
                    halResult.push(r)
                }
                res.send(halResult)
            }
        } catch (err) {
            res.send(err)
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