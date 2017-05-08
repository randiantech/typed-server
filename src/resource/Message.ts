import Resource from '../lib/resource/Resource'
import EmbeddedResource from '../lib/resource/EmbeddedResource'
import PostgreCriteria from '../lib/db/postgre/PostgreCriteria'
import MessageSocialInfo from './common/MessageSocialInfo'
import QueryTuple from '../lib/resource/QueryTuple'
import QueryTupleOperation from '../lib/resource/QueryTupleOperation'
import Profile from './Profile'

export default class Message extends Resource<Message> {

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

    transform(obj: any): Message {
        return Message.transform(obj)
    }

    static transform(obj: any): Message {
        return new Message(obj.value, obj.date, MessageSocialInfo.transform(obj), obj.profileid, obj.id)
    }

    validate(obj: any) {
        return Message.validate(obj)
    }

    static validate(obj: any) {
        return
    }

    /**
     * Given the name of a property, returns its database type
     * @param propertyName the name of the property to which type will be resolved 
     */
    static getPropertyType(propertyName: string): string {
        if(propertyName.startsWith('messageSocialInfo')){
            propertyName = propertyName.split('.')[0]
            return MessageSocialInfo.getPropertyType(propertyName)
        } 

        switch(propertyName.toLocaleLowerCase()) {
            case 'id': return 'bigint'
            case 'date': return 'bigint'
            case 'profileid': return 'bigint'
        }
    }
}