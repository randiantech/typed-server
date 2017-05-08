import Resource from '../lib/resource/Resource'
import EmbeddedResource from '../lib/resource/EmbeddedResource'
import PersonalInfo from './common/PersonalInfo'
import AppLogEntry from '../lib/error/AppLogEntry'
import AppLogType from '../lib/error/AppLogType'

export default class Profile extends Resource<Profile> {

    public static RESOURCE_NAME: string = 'profile';
    private personalInfo: PersonalInfo;

    /**
     * constructor
     * @param personalInfo personal information of the profile
     */
    constructor(personalInfo: PersonalInfo, id?: string) {
        super(Profile.RESOURCE_NAME, id);
        this.validate({ personalInfo, id });
        this.personalInfo = personalInfo;
    }

    transform(obj: any): Profile {
        return Profile.transform(obj)
    }

    static transform(obj: any): Profile {
        return new Profile(PersonalInfo.transform(obj), obj.id)
    }

    static validate(obj: any) {
        return Profile.validate(obj)
    }

    validate(obj: any) {
        try {
            PersonalInfo.validate(obj.personalInfo)
        } catch (err) {
            throw new AppLogEntry(AppLogType.ERROR, `Error transforming Profile instance: Provided input: ${obj}`, err)
        }
    }

    embeddeds(): EmbeddedResource[] {
        return []
    }

    static getPropertyType(propertyName: string): string {
        if(propertyName.startsWith('personalInfo')){
            propertyName = propertyName.split('.')[0]
            return PersonalInfo.getPropertyType(propertyName)
        }
    }
}