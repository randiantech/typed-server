import Profile from '../resource/Profile'
import PostgreRepository from '../lib/db/postgre/PostgreRepository'
import Method from '../lib/constant/Method'
import route from '../lib/annotation/route'
import HalHandler from '../lib/hal/HalHandler'
var __this;

export default class ProfileService extends PostgreRepository<Profile> {

    constructor() {
        super(Profile.RESOURCE_NAME);
        __this = this;
    }

    getResource() {
        return Profile
    }

    @route(Method.GET, ['/profile/:id', '/profile'])
    async getProfile(req, res, next) {
        HalHandler.process(__this, req, res, Profile)
    }
}