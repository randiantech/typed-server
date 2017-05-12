import Resource from '../lib/resource/Resource'
import PersonalInfo from './PersonalInfo'
import ApplicationException from '../lib/error/ApplicationException'
import EmbeddedResource from '../lib/resource/EmbeddedResource'
import PostgreCriteria from '../lib/db/postgre/PostgreCriteria'
import QueryTuple from '../lib/resource/QueryTuple'
import QueryTupleOperation from '../lib/resource/QueryTupleOperation'
import Message from './Message'
const mapper = require('./mappers/Profile.mapper')

/**
 * Profile Resource definition
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class Profile extends Resource<Profile> {

    /**
     * @type {string} the name of the resource
     */
    public static RESOURCE_NAME: string = 'profile';


    private personalInfo: PersonalInfo;

    /**
     * constructor
     * @param personalInfo personal information of the profile
     * @param id the id of the resource
     */
    constructor(personalInfo: PersonalInfo, id?: string) {
        super(Profile.RESOURCE_NAME, id);
        this.validate({ personalInfo, id });
        this.personalInfo = personalInfo;
    }

    /**
     * Attempts to create a Profile object from given plain javascript object input
     * @param obj the object from which it will be tried to be constructed an instance of Profile class
     * @returns {Profile} instance of Profile class
     */
    create(obj: any): Profile {
        return Profile.create(obj)
    }

    /**
     * Attempts to create a Profile object from given plain javascript object input
     * @param obj the object from which it will be tried to be constructed an instance of Profile class
     * @returns {Profile} instance of Profile class
     */
    static create(obj: any): Profile {
        return new Profile(PersonalInfo.create(obj), obj.id)
    }

    /**
     * Validates whether or not supplied object contains valid parameters to construct a Profile instance
     * @param obj object to be validated
     */
    validate(obj: any) {
        try {
            PersonalInfo.validate(obj.personalInfo)
        } catch (err) {
            throw new ApplicationException(`Error creating Profile instance: Provided input: ${obj}`, err)
        }
    }

    /**
     * Defines the list of embedded resources of the Profile resource
     * @returns {EmbeddedResource[]} list of EmbeddedResource
     */
    embeddeds(): EmbeddedResource[] {
        return [
            new EmbeddedResource(
                'message',
                Message.RESOURCE_NAME,
                new PostgreCriteria([new QueryTuple('profileId', this.getId(), 'bigint', QueryTupleOperation.EQUALS)]))
        ]
    }
}