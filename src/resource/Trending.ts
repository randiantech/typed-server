import Resource from '../lib/resource/Resource'
import PersonalInfo from './PersonalInfo'
import ApplicationException from '../lib/error/ApplicationException'
import EmbeddedResource from '../lib/resource/EmbeddedResource'
import PostgreCriteria from '../lib/db/postgre/PostgreCriteria'
import QueryTuple from '../lib/resource/QueryTuple'
import QueryTupleOperation from '../lib/resource/QueryTupleOperation'
const mapper = require('./mappers/Trending.mapper')

/**
 * Trending Resource definition
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class Trending extends Resource<Trending> {

    /**
     * @type {string} the name of the resource
     */
    public static RESOURCE_NAME: string = 'trending';

    private image: string
    private title: string
    private location: string
    private fans: number

    /**
     * constructor
     * @param image Image of the trending event
     * @param title Title of the trending event
     * @param location Location of the trending event
     * @param fans Number of current fans on the trending event
     * @param id the id of the resource
     */
    constructor(image: string, title: string, location: string, fans: number, id?: string) {
        super(Trending.RESOURCE_NAME, id);
        this.validate({ image, title, location, id });
        this.image = image;
        this.title = title;
        this.location = location;
        this.fans = fans;
    }

    /**
     * Attempts to create a Trending object from given plain javascript object input
     * @param obj the object from which it will be tried to be constructed an instance of Trending class
     * @returns {Trending} instance of Trending class
     */
    create(obj: any): Trending {
        return Trending.create(obj)
    }

    /**
     * Attempts to create a Trending object from given plain javascript object input
     * @param obj the object from which it will be tried to be constructed an instance of Trending class
     * @returns {Trending} instance of Trending class
     */
    static create(obj: any): Trending {
        return new Trending(obj.image, obj.title, obj.location, parseInt(obj.fans), obj.id)
    }

    /**
     * Validates whether or not supplied object contains valid parameters to construct a Trending instance
     * @param obj object to be validated
     */
    validate(obj: any) {
        return
    }

    /**
     * Defines the list of embedded resources of the Trending resource
     * @returns {EmbeddedResource[]} list of EmbeddedResource
     */
    embeddeds(): EmbeddedResource[] {
        return []
    }
}