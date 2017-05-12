import Factory from '../lib/common/Factory'

/**
 * PersonalInfo Info object
 * //TODO This is not a resource indeed, it would be somewhere else to clearly state that
 */
export default class PersonalInfo implements Factory<PersonalInfo>{
    
    private name: string;
    private lastName: string;
    private email: string;
    private age: number;
    private bio: string;
    private photo: string;

    /**
     * constructor
     * @param name name of the person 
     * @param lastName last name of the person
     * @param email email of the person
     * @param age age of the person
     * @param bio biography/description of the person
     * @param photo photo of the person
     */
    constructor(name: string, lastName: string, email: string, age: number, bio: string, photo: string) {
        this.validate({name, lastName, email, age, bio, photo});
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.bio = bio;
        this.photo = photo;
    }

    /**
     * Attempts to create a PersonalInfo object from given plain javascript object input
     * @param obj the object from which it will be tried to be constructed an instance of PersonalInfo class
     * @returns {PersonalInfo} instance of PersonalInfo class
     */
    create(obj:any): PersonalInfo {
        return PersonalInfo.create(obj)
    }

    /**
     * Attempts to create a PersonalInfo object from given plain javascript object input
     * @param obj the object from which it will be tried to be constructed an instance of PersonalInfo class
     * @returns {PersonalInfo} instance of PersonalInfo class
     */
    static create(obj: any): PersonalInfo {
        return new PersonalInfo(obj.name, obj.lastName, obj.email, obj.age, obj.bio, obj.avatar)
    }

    /**
     * Validates whether or not supplied object contains valid parameters to construct a Profile instance
     * @param obj object to be validated
     */
    validate(obj:any) {
        return PersonalInfo.validate(obj) 
    }

    /**
     * Validates whether or not supplied object contains valid parameters to construct a Profile instance
     * @param obj object to be validated
     */
    static validate(obj:any) {
        return
    }
}