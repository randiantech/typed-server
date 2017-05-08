import Profile from '../resource/Profile'
import PostgreRepository from '../lib/db/postgre/PostgreRepository'
import Method from '../lib/constant/Method'
import route from '../lib/annotation/route'
var __this;

export default class ProfileService extends PostgreRepository<Profile> {
    constructor() {
        super(Profile.RESOURCE_NAME);
        __this = this;
    }

    @route(Method.GET, '/profile/:id')
    async getProfile(req, res, next) {
        try {
            let result = await __this.getById(req.params.id)
            result = await result.toHAL()
            res.send(result)
        } catch (err) {
            res.send(err)
        }
    }

    transform(obj: any): Profile {
        return Profile.transform(obj);
    }

    static transform(obj: any): Profile {
        return Profile.transform(obj);
    }

    validate(obj: any) {
        Profile.validate(obj);
    }

    static validate(obj: any) {
        Profile.validate(obj);
    }
}