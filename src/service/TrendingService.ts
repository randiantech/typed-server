import Trending from '../resource/Trending'
import PostgreRepository from '../lib/db/postgre/PostgreRepository'
import Method from '../lib/constant/Method'
import route from '../lib/annotation/route'
import RequestPreProcessor from '../lib/hal/RequestPreProcessor'
var __this;

export default class TrendingService extends PostgreRepository<Trending> {

    constructor() {
        super(Trending.RESOURCE_NAME);
        __this = this;
    }

    getResource() {
        return Trending
    }

    @route(Method.GET, ['/trending/:id', '/trending'])
    async getTrendings(req, res, next) {
        RequestPreProcessor.search(__this, req, res, Trending)
    }
}