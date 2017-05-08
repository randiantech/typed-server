import Transformable from '../../lib/repository/Transformable'

export default class PersonalInfo implements Transformable<PersonalInfo>{
    
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

    transform(obj:any): PersonalInfo {
        return PersonalInfo.transform(obj)
    }

    static transform(obj: any): PersonalInfo {
        return new PersonalInfo(obj.name, obj.lastName, obj.email, obj.age, obj.bio, obj.avatar)
    }

    validate(obj:any) {
        return PersonalInfo.validate(obj) 
    }

    static validate(obj:any) {
        return
    }

    static getPropertyType(propertyName: string): string {
        switch(propertyName.toLowerCase()) {
            case 'name': return 'string'
            case 'lastname': return 'string'
            case 'email': return 'string'
            case 'age': return 'int'
            case 'bio': return 'string'
            case 'photo': return 'string'
        }
    }
}