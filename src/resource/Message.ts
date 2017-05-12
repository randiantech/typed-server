import Resource from '../lib/resource/Resource'
import EmbeddedResource from '../lib/resource/EmbeddedResource'
import PostgreCriteria from '../lib/db/postgre/PostgreCriteria'
import MessageSocialInfo from './MessageSocialInfo'
import QueryTuple from '../lib/resource/QueryTuple'
import QueryTupleOperation from '../lib/resource/QueryTupleOperation'
import Profile from './Profile'
const mapper = require('./mappers/Message.mapper')

/**
 * Message Resource definition
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class Message extends Resource<Message> {

    /**
     * The name of the resource. This field is particularly important to link the corresponding resource mapper
     */
    public static RESOURCE_NAME: string = 'message';

    private value: string;
    private date: number;
    private profileId: number;
    private messageSocialInfo: MessageSocialInfo;

    /**
     * constructor
     * @param value 
     * @param date 
     * @param messageSocialInfo
     * @param profileId
     * @param id 
     */
    constructor(value: string, date: number, messageSocialInfo: MessageSocialInfo, profileId: number, id?: string) {
        super(Message.RESOURCE_NAME, id)
        this.validate({ value, date, messageSocialInfo, profileId, id })
        this.value = value
        this.date = date
        this.messageSocialInfo = messageSocialInfo
        this.profileId = profileId
    }

    /**
     * Define the list of embedded resources of the resource
     */
    embeddeds(): EmbeddedResource[] {
        return [
            new EmbeddedResource(
                'profile',
                Profile.RESOURCE_NAME,
                new PostgreCriteria([new QueryTuple('id', this.profileId, 'bigint', QueryTupleOperation.EQUALS)]))
        ]
    }

    /**
     * Given an object, attempts to construct a Message instance
     * @params obj Plain Javascript Object from which this factory method will try to construct an instance of a Message
     */
    create(obj: any): Message {
        return Message.create(obj)
    }

    /**
     * Given an object, attempts to construct a Message instance
     * @params obj Plain Javascript Object from which this factory method will try to construct an instance of a Message
     */
    static create(obj: any): Message {
        return new Message(obj.value, obj.date, MessageSocialInfo.create(obj), obj.profileid, obj.id)
    }
    
    /**
     * Given an object, validates that the supplied parameters are valid to construct an instance
     * @params obj Plain Javascript Object Message object
     */
    validate(obj: any) {
        return Message.validate(obj)
    }

    /**
     * Given an object, validates that the supplied parameters are valid to construct an instance
     * @params obj Plain Javascript Object Message object
     */
    static validate(obj: any) {
        return
    }
}