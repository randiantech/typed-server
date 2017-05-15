(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(42);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Application_1 = __webpack_require__(2);
	var ProfileService_1 = __webpack_require__(10);
	var MessageService_1 = __webpack_require__(36);
	var TrendingService_1 = __webpack_require__(37);
	var MapperProvider_1 = __webpack_require__(20);
	var Message_mapper_1 = __webpack_require__(30);
	var Trending_mapper_1 = __webpack_require__(39);
	var MessageSocialInfo_mapper_1 = __webpack_require__(40);
	var PersonalInfo_mapper_1 = __webpack_require__(41);
	var Profile_mapper_1 = __webpack_require__(31);
	var Message_1 = __webpack_require__(28);
	var MessageSocialInfo_1 = __webpack_require__(29);
	var PersonalInfo_1 = __webpack_require__(15);
	var Profile_1 = __webpack_require__(11);
	var Trending_1 = __webpack_require__(38);
	var port = process.env.APP_PORT;
	var apiVersion = 2;
	var host = "http://localhost:3000/";
	MapperProvider_1.default.add(Message_1.default.name, Message_mapper_1.default);
	MapperProvider_1.default.add(Trending_1.default.name, Trending_mapper_1.default);
	MapperProvider_1.default.add(MessageSocialInfo_1.default.name, MessageSocialInfo_mapper_1.default);
	MapperProvider_1.default.add(PersonalInfo_1.default.name, PersonalInfo_mapper_1.default);
	MapperProvider_1.default.add(Profile_1.default.name, Profile_mapper_1.default);
	new Application_1.default([new ProfileService_1.default(), new MessageService_1.default(), new TrendingService_1.default()], port, apiVersion, host);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var express = __webpack_require__(3);
	var logger = __webpack_require__(4);
	var bodyParser = __webpack_require__(5);
	var cookieParser = __webpack_require__(6);
	var http = __webpack_require__(7);
	var RouterFactory_1 = __webpack_require__(8);
	var _services = {};
	var app = express();
	/**
	 * Application Bootstrap class in charge of creating the http server
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var Application = (function () {
	    /**
	     *
	     */
	    function Application(services, port, version, host) {
	        version ? Application.API_VERSION = version : 'v1';
	        host ? Application.HOST = host : '';
	        //TODO This middlewares would be optional / configurable
	        app.use(logger('dev'));
	        app.use(bodyParser.json());
	        app.use(bodyParser.urlencoded({ extended: false }));
	        app.use(cookieParser());
	        //TODO This middlewares would be optional / configurable
	        app.use(this.injectPaginationParams);
	        app.use("/v" + version, RouterFactory_1.default.getRouter());
	        app.set('port', port || Application.DEFAULT_PORT);
	        var server = http.createServer(app);
	        server.listen(port || Application.DEFAULT_PORT);
	        server.on('listening', function () {
	            var addr = server.address();
	            var bind = (typeof addr === 'string' ? "pipe " + addr : "port " + addr.port);
	        });
	        services.forEach(function (service) {
	            _services[service.getName()] = service;
	        });
	    }
	    Application.prototype.injectPaginationParams = function (req, res, next) {
	        !req.query['page_size'] ? req.query['page_size'] = Application.DEFAULT_PAGE_SIZE : '';
	        !req.query['page'] ? req.query['page'] = Application.DEFAULT_PAGE : '';
	        return next();
	    };
	    Application.getServiceByName = function (name) {
	        return _services[name];
	    };
	    return Application;
	}());
	/**
	 * Default Application Port to be used in case specific value is not provided
	 */
	Application.DEFAULT_PORT = 3000;
	/**
	 * Default page number to be used in case specific page value is not provided
	 */
	Application.DEFAULT_PAGE = 1;
	/**
	 * Default page size number to be used in case specific page size value is not provided
	 */
	Application.DEFAULT_PAGE_SIZE = 50;
	exports.default = Application;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("morgan");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("cookie-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var express = __webpack_require__(3);
	var Method_1 = __webpack_require__(9);
	var router = express.Router();
	/**
	 * Router Factory is responsible to create routes for resource services
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var RouterFactory = (function () {
	    function RouterFactory() {
	    }
	    /**
	     * Creates a route for the given HTTP method + url(s) combination
	     * @param method HTTP method
	     * @param urls list of (or single) url(s) where route will be binded
	     * @handler Function that will handle the route execution
	     */
	    RouterFactory.create = function (method, urls, handler) {
	        switch (method) {
	            case Method_1.default.GET:
	                router.get(urls, handler);
	                break;
	            case Method_1.default.POST:
	                router.post(urls, handler);
	                break;
	            case Method_1.default.PUT:
	                router.put(urls, handler);
	                break;
	            case Method_1.default.DELETE:
	                router.delete(urls, handler);
	                break;
	        }
	    };
	    /**
	     * Returns an instance of an express router object
	     */
	    RouterFactory.getRouter = function () {
	        return router;
	    };
	    return RouterFactory;
	}());
	exports.default = RouterFactory;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * List of HTTP methods
	 */
	var Method;
	(function (Method) {
	    Method[Method["GET"] = 0] = "GET";
	    Method[Method["PUT"] = 1] = "PUT";
	    Method[Method["POST"] = 2] = "POST";
	    Method[Method["DELETE"] = 3] = "DELETE";
	    Method[Method["OPTIONS"] = 4] = "OPTIONS";
	    Method[Method["PATCH"] = 5] = "PATCH";
	})(Method = exports.Method || (exports.Method = {}));
	exports.default = Method;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var Profile_1 = __webpack_require__(11);
	var PostgreRepository_1 = __webpack_require__(32);
	var Method_1 = __webpack_require__(9);
	var route_1 = __webpack_require__(34);
	var HalHandler_1 = __webpack_require__(35);
	var __this;
	var ProfileService = (function (_super) {
	    __extends(ProfileService, _super);
	    function ProfileService() {
	        var _this = _super.call(this, Profile_1.default.RESOURCE_NAME) || this;
	        __this = _this;
	        return _this;
	    }
	    ProfileService.prototype.getResource = function () {
	        return Profile_1.default;
	    };
	    ProfileService.prototype.getProfile = function (req, res, next) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                HalHandler_1.default.process(__this, req, res, Profile_1.default);
	                return [2 /*return*/];
	            });
	        });
	    };
	    return ProfileService;
	}(PostgreRepository_1.default));
	__decorate([
	    route_1.default(Method_1.default.GET, ['/profile/:id', '/profile']),
	    __metadata("design:type", Function),
	    __metadata("design:paramtypes", [Object, Object, Object]),
	    __metadata("design:returntype", Promise)
	], ProfileService.prototype, "getProfile", null);
	exports.default = ProfileService;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Resource_1 = __webpack_require__(12);
	var PersonalInfo_1 = __webpack_require__(15);
	var ApplicationException_1 = __webpack_require__(13);
	var EmbeddedResource_1 = __webpack_require__(16);
	var PostgreCriteria_1 = __webpack_require__(17);
	var QueryTuple_1 = __webpack_require__(18);
	var QueryTupleOperation_1 = __webpack_require__(19);
	var Message_1 = __webpack_require__(28);
	var mapper = __webpack_require__(31);
	/**
	 * Profile Resource definition
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var Profile = (function (_super) {
	    __extends(Profile, _super);
	    /**
	     * constructor
	     * @param personalInfo personal information of the profile
	     * @param id the id of the resource
	     */
	    function Profile(personalInfo, id) {
	        var _this = _super.call(this, Profile.RESOURCE_NAME, id) || this;
	        _this.validate({ personalInfo: personalInfo, id: id });
	        _this.personalInfo = personalInfo;
	        return _this;
	    }
	    /**
	     * Attempts to create a Profile object from given plain javascript object input
	     * @param obj the object from which it will be tried to be constructed an instance of Profile class
	     * @returns {Profile} instance of Profile class
	     */
	    Profile.prototype.create = function (obj) {
	        return Profile.create(obj);
	    };
	    /**
	     * Attempts to create a Profile object from given plain javascript object input
	     * @param obj the object from which it will be tried to be constructed an instance of Profile class
	     * @returns {Profile} instance of Profile class
	     */
	    Profile.create = function (obj) {
	        return new Profile(PersonalInfo_1.default.create(obj), obj.id);
	    };
	    /**
	     * Validates whether or not supplied object contains valid parameters to construct a Profile instance
	     * @param obj object to be validated
	     */
	    Profile.prototype.validate = function (obj) {
	        try {
	            PersonalInfo_1.default.validate(obj.personalInfo);
	        }
	        catch (err) {
	            throw new ApplicationException_1.default("Error creating Profile instance: Provided input: " + obj, err);
	        }
	    };
	    /**
	     * Defines the list of embedded resources of the Profile resource
	     * @returns {EmbeddedResource[]} list of EmbeddedResource
	     */
	    Profile.prototype.embeddeds = function () {
	        return [
	            new EmbeddedResource_1.default('message', Message_1.default.RESOURCE_NAME, new PostgreCriteria_1.default([new QueryTuple_1.default('profileId', this.getId(), 'bigint', QueryTupleOperation_1.default.EQUALS)]))
	        ];
	    };
	    return Profile;
	}(Resource_1.default));
	/**
	 * @type {string} the name of the resource
	 */
	Profile.RESOURCE_NAME = 'profile';
	exports.default = Profile;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var ApplicationException_1 = __webpack_require__(13);
	var Application_1 = __webpack_require__(2);
	var utils_1 = __webpack_require__(14);
	/**
	 * Abstract class required to be fully implemented by final resource classes. It provides a more strict resource
	 * contract as well as common functionality required by any resource, in example, to fully generate a HAL representation
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var Resource = (function () {
	    /**
	     * constructor
	     * @param name the name of the resource
	     * @param id the id of the resource
	     */
	    function Resource(name, id) {
	        this.id = id;
	        this.name = name;
	    }
	    /**
	     * @returns {string} the name of the resource
	     */
	    Resource.prototype.getName = function () {
	        return this.name;
	    };
	    /**
	     * @returns {string} the id of the resource
	     */
	    Resource.prototype.getId = function () {
	        return this.id;
	    };
	    /**
	     * Creates a HAL representation of a resource. Hal representations often require other database calls to fulfill
	     * the representation (Particularly to execute queries for embedded resources)
	     *
	     * @param isRoot VERY IMPORTANT! This field denotes if the resource asking for the HAL representation is the original
	     * one. This is important since we dont want to further expand HAL representation on embedded resources. This is
	     * particularly import since it avoid circular dependency hell. In example:
	     * Profile resource embeds a message collection of Message resources. Also, Message resource embeds a Profile
	     * resource. If isRoot is not properly used, Message and Profile will enter on a circular dependency resolution
	     * issue. Setting isRoot to true, embedded resources are not HAL representations (though, no _links and
	     * no _embedded sections).
	     *
	     * @returns {{}} a Hal representation of the caller resource
	     */
	    Resource.prototype.toHal = function (isRoot) {
	        return __awaiter(this, void 0, void 0, function () {
	            var __this, hal, i, embeddedResource, service, response;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        __this = this;
	                        hal = {};
	                        if (!__this.id) {
	                            throw new ApplicationException_1.default("A resource must contain an ID to be represented");
	                        }
	                        Object.keys(__this).forEach(function (key) {
	                            hal[key] = __this[key];
	                        });
	                        hal['_links'] = {};
	                        hal['_embedded'] = {};
	                        hal['_links'] = {
	                            self: utils_1.removeDuplicatedSlashes(Application_1.default.HOST + "/v" + Application_1.default.API_VERSION + "/" + __this.getName() + "/" + __this.getId())
	                        };
	                        if (!isRoot) return [3 /*break*/, 4];
	                        i = 0;
	                        _a.label = 1;
	                    case 1:
	                        if (!(i < __this.embeddeds().length)) return [3 /*break*/, 4];
	                        embeddedResource = __this.embeddeds()[i];
	                        service = Application_1.default.getServiceByName(embeddedResource.getResourceName());
	                        return [4 /*yield*/, service.search(embeddedResource.getCriteria(), service.getResource())];
	                    case 2:
	                        response = _a.sent();
	                        hal['_embedded'][embeddedResource.getName()] = response.getResources();
	                        _a.label = 3;
	                    case 3:
	                        i++;
	                        return [3 /*break*/, 1];
	                    case 4: return [2 /*return*/, hal];
	                }
	            });
	        });
	    };
	    return Resource;
	}());
	exports.default = Resource;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Application Exception
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var ApplicationException = (function () {
	    /**
	     * constructor
	     * @param description a description of the exception event
	     * @param stack an optional stack trace to be attached to generated HAL error representation
	     */
	    function ApplicationException(description, stack) {
	        this.date = new Date().toISOString();
	        this.description = description;
	        this.stack = stack;
	    }
	    /**
	     * Returns a HAL representation of the exception
	     * @returns {{date: string, description: string, stack: string, _links: {}, _embedded: {}}}
	     */
	    ApplicationException.prototype.toHal = function () {
	        return {
	            date: this.date,
	            description: this.description,
	            stack: "" + (this.stack ? this.stack : 'N/A'),
	            _links: {},
	            _embedded: {}
	        };
	    };
	    return ApplicationException;
	}());
	exports.default = ApplicationException;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Given an url as an string, removes duplicated slashes from it.
	 * Example:
	 * http://www.google.com// -> http://www.google.com/
	 * @param url url to which duplicated slashes will be removed from
	 */
	function removeDuplicatedSlashes(url) {
	    return url.replace(/([^:]\/)\/+/g, "$1");
	}
	exports.removeDuplicatedSlashes = removeDuplicatedSlashes;
	/**
	 * Injects named parameters as query params
	 * @param req HTTP request
	 *
	 * //TODO this is not ideal. I need to somehow implement a decorator that executes
	 * //TODO each and every time before a @route annotated method.
	 */
	function injectIdParams(req) {
	    Object.keys(req.params).forEach(function (paramName) {
	        if (req.params[paramName])
	            req.query[paramName] = req.params[paramName];
	    });
	}
	exports.injectIdParams = injectIdParams;
	function toQueryString(req) {
	    var queryString = '?';
	    Object.keys(req.query).forEach(function (val) {
	        queryString += val + "=" + req.query[val] + "&";
	    });
	    queryString = queryString.slice(0, -1);
	    return removeDuplicatedSlashes(queryString);
	}
	exports.toQueryString = toQueryString;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * PersonalInfo Info object
	 * //TODO This is not a resource indeed, it would be somewhere else to clearly state that
	 */
	var PersonalInfo = (function () {
	    /**
	     * constructor
	     * @param name name of the person
	     * @param lastName last name of the person
	     * @param email email of the person
	     * @param age age of the person
	     * @param bio biography/description of the person
	     * @param photo photo of the person
	     */
	    function PersonalInfo(name, lastName, email, age, bio, photo) {
	        this.validate({ name: name, lastName: lastName, email: email, age: age, bio: bio, photo: photo });
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
	    PersonalInfo.prototype.create = function (obj) {
	        return PersonalInfo.create(obj);
	    };
	    /**
	     * Attempts to create a PersonalInfo object from given plain javascript object input
	     * @param obj the object from which it will be tried to be constructed an instance of PersonalInfo class
	     * @returns {PersonalInfo} instance of PersonalInfo class
	     */
	    PersonalInfo.create = function (obj) {
	        return new PersonalInfo(obj.name, obj.lastName, obj.email, obj.age, obj.bio, obj.avatar);
	    };
	    /**
	     * Validates whether or not supplied object contains valid parameters to construct a Profile instance
	     * @param obj object to be validated
	     */
	    PersonalInfo.prototype.validate = function (obj) {
	        return PersonalInfo.validate(obj);
	    };
	    /**
	     * Validates whether or not supplied object contains valid parameters to construct a Profile instance
	     * @param obj object to be validated
	     */
	    PersonalInfo.validate = function (obj) {
	        return;
	    };
	    return PersonalInfo;
	}());
	exports.default = PersonalInfo;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * An embedded resource is a resource linked to another resource. Its represented on _embedded key of a HAL resource
	 * representation
	 *
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var EmbeddedResource = (function () {
	    /**
	     * constructor
	     * @param name the name to be used as key on the _embedded section of the container resource
	     * @param resourceName the name of the resource that will contain it
	     * @param criteria the criteria object used to generate the corresponding query
	     */
	    function EmbeddedResource(name, resourceName, criteria) {
	        this.name = name;
	        this.resourceName = resourceName;
	        this.criteria = criteria;
	    }
	    /**
	     * @returns {string} the name used as key on the _embedded section of the container resource
	     */
	    EmbeddedResource.prototype.getName = function () {
	        return this.name;
	    };
	    /**
	     * @returns {Criteria} the criteria to be used to generate the query
	     */
	    EmbeddedResource.prototype.getCriteria = function () {
	        return this.criteria;
	    };
	    /**
	     * @returns {string} The name of the resource that will contain the embedded resource
	     */
	    EmbeddedResource.prototype.getResourceName = function () {
	        return this.resourceName;
	    };
	    return EmbeddedResource;
	}());
	exports.default = EmbeddedResource;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var QueryTuple_1 = __webpack_require__(18);
	var QueryTupleOperation_1 = __webpack_require__(19);
	var MapperProvider_1 = __webpack_require__(20);
	var utils_db_1 = __webpack_require__(21);
	var utils_postgre_1 = __webpack_require__(22);
	/**
	 * Implementation of a Criteria for Postgre databases. A criteria is capable to resolve to a parametrized query through
	 * QueryTuples.
	 */
	var PostgreCriteria = (function () {
	    /**
	     * constructor
	     * @param tuples list of tuples used to create a criteria
	     */
	    function PostgreCriteria(tuples) {
	        this.tuples = tuples;
	    }
	    /**
	     * @returns {QueryTuple[]} list of tuples
	     */
	    PostgreCriteria.prototype.getTuples = function () {
	        return this.tuples;
	    };
	    /**
	     * A criteria object can be resolved and thus return a parametrized Postgre database query
	     * @param tableName the name of the table where created query will be applied
	     * @returns {{statement: string, totalsStatement: string, values: Array}}
	     */
	    PostgreCriteria.prototype.resolve = function (tableName) {
	        var __this = this;
	        var statement = "SELECT * FROM " + tableName;
	        var totalsStatement = "SELECT COUNT(*) FROM " + tableName;
	        var whereStatement = "";
	        var paginationStatement = "";
	        var page;
	        var pageSize;
	        var values = [];
	        var fieldPosition = 0;
	        __this.tuples.forEach(function (tuple, idx) {
	            fieldPosition++;
	            switch (tuple.fieldName) {
	                case 'page':
	                case 'page_size':
	                    if (tuple.fieldName === 'page_size') {
	                        pageSize = tuple.fieldValue;
	                        paginationStatement += "LIMIT $" + fieldPosition + " ";
	                        values.push(pageSize);
	                    }
	                    if (tuple.fieldName === 'page') {
	                        paginationStatement += "OFFSET $" + fieldPosition + " ";
	                        values.push((tuple.fieldValue - 1) * pageSize);
	                    }
	                    break;
	                default:
	                    values.push(tuple.fieldValue);
	                    var operation = utils_postgre_1.resolveTupleOperation(tuple.operation);
	                    tuple.operation === QueryTupleOperation_1.default.CONTAINS ? tuple.fieldValue = "%" + tuple.fieldValue + "%" : '';
	                    whereStatement += tuple.fieldName + "::" + tuple.fieldType + " " + utils_postgre_1.resolveTupleOperation(tuple.operation) + " $" + fieldPosition;
	                    whereStatement += " AND ";
	                    break;
	            }
	        });
	        whereStatement = whereStatement.substring(0, whereStatement.length - " AND ".length);
	        whereStatement ? statement += " WHERE " + whereStatement : '';
	        whereStatement ? totalsStatement += " WHERE " + whereStatement : '';
	        paginationStatement ? statement += " " + paginationStatement + " " : '';
	        paginationStatement ? totalsStatement += " " + paginationStatement + " " : '';
	        statement = statement.toUpperCase();
	        totalsStatement = totalsStatement.toUpperCase();
	        return { statement: statement, totalsStatement: totalsStatement, values: values };
	    };
	    /**
	     * Creates a criteria instance using an HTTP request object, and a resource instance
	     * @param request the HTTP request object from which data will be extracted to create criteria tuples
	     * @param resource the resource used to resolve its corresponding mapper
	     * @returns {PostgreCriteria} A postgre database criteria object
	     */
	    PostgreCriteria.prototype.create = function (request, resource) {
	        return PostgreCriteria.create(request, resource);
	    };
	    /**
	     * Creates a criteria instance using an HTTP request object, and a resource instance
	     * @param request the HTTP request object from which data will be extracted to create criteria tuples
	     * @param resource the resource used to resolve its corresponding mapper
	     * @returns {PostgreCriteria} A postgre database criteria object
	     */
	    PostgreCriteria.create = function (request, resource) {
	        var tuples = [];
	        Object.keys(request.query).forEach(function (key) {
	            var mapping = MapperProvider_1.default.get(resource.name, utils_db_1.resolveKey(key));
	            var value = request.query[key];
	            tuples.push(new QueryTuple_1.default(mapping.name, value, mapping.type, utils_db_1.resolveOperation(key)));
	        });
	        return new PostgreCriteria(tuples);
	    };
	    return PostgreCriteria;
	}());
	exports.default = PostgreCriteria;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * A QueryTuple represents an statement used to create a search query
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var QueryTuple = (function () {
	    /**
	     * constructor
	     * @param fieldName the name of the field that needs to be queried
	     * @param fieldValue the value of the field that needs to be queried
	     * @param fieldType the type of the field
	     * @param operation the operation (check QueryTupleOperation class) hold on this QueryTuple
	     */
	    function QueryTuple(fieldName, fieldValue, fieldType, operation) {
	        this.fieldName = fieldName;
	        this.fieldValue = fieldValue;
	        this.fieldType = fieldType;
	        this.operation = operation;
	    }
	    /**
	     * @returns {string} the name of the field that needs to be queried
	     */
	    QueryTuple.prototype.getFieldName = function () {
	        return this.fieldName;
	    };
	    /**
	     * @returns {string|string[]|number|number[]|any} the value of the field that needs to be queried
	     */
	    QueryTuple.prototype.getFieldValue = function () {
	        return this.fieldValue;
	    };
	    /**
	     * @returns {string} the type of the field
	     */
	    QueryTuple.prototype.getFieldType = function () {
	        return this.fieldType;
	    };
	    /**
	     * @returns {QueryTupleOperation} the operation (check QueryTupleOperation class) hold on this QueryTuple
	     */
	    QueryTuple.prototype.getOperation = function () {
	        return this.operation;
	    };
	    return QueryTuple;
	}());
	exports.default = QueryTuple;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * List of QueryTuple operations. Used to determine the type of requested query
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var QueryTupleOperation;
	(function (QueryTupleOperation) {
	    QueryTupleOperation[QueryTupleOperation["EQUALS"] = 0] = "EQUALS";
	    QueryTupleOperation[QueryTupleOperation["GREATER_THAN"] = 1] = "GREATER_THAN";
	    QueryTupleOperation[QueryTupleOperation["LESSER_THAN"] = 2] = "LESSER_THAN";
	    QueryTupleOperation[QueryTupleOperation["CONTAINS"] = 3] = "CONTAINS";
	})(QueryTupleOperation = exports.QueryTupleOperation || (exports.QueryTupleOperation = {}));
	exports.default = QueryTupleOperation;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var mappers = {};
	/**
	 * Class responsible of handling resource property mapper. A Mapper is a <RESOURCE_NAME>.mapper.ts file that
	 * contains information regarding the type of the field in the database (ie: if its varchar or bigint) and
	 * the name to which maps to (typically, the column name on a relational database). Other database specific
	 * fields would be added here in the future
	 *
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var MapperProvider = (function () {
	    function MapperProvider() {
	    }
	    /**
	     * @param resourceName the name of the resource. For this value would be use <RESOURCE>.RESOURCE_NAME
	     * @param mapper the <RESOURCE>.mapper.ts json file that contains the type and name information
	     */
	    MapperProvider.add = function (resourceName, mapper) {
	        mappers[resourceName] = mapper;
	    };
	    /**
	     * Given a field name -that it can be a dot separated one- resolves the mapper entry corresponding to it.
	     * A mapper entry is a json value of type {type:<STRING>, name:<STRING>}
	     * @param resourceName the name of the resource
	     * @param fieldName the field name. It can be dot separated one, in example: personalInfo.name
	     */
	    MapperProvider.get = function (resourceName, fieldName) {
	        var targetResource;
	        var mapper = mappers[resourceName];
	        if (MapperProvider.isReservedFieldName(fieldName)) {
	            return { type: '', name: fieldName };
	        }
	        //If fieldName contains ., that means its the property of a resource. It could be N number of sub
	        //resources (in example, if the fieldName is 'personalInfo.bankInformation.id' we need to recursively
	        //resolve id field of bankInformation mapper, referred by personalInfo mapper)  
	        if (fieldName.indexOf('.') !== -1) {
	            var separatorIndex = fieldName.indexOf('.');
	            var subResourceName = fieldName.substring(0, separatorIndex - 1);
	            var subFieldName = fieldName.substring(separatorIndex + 1, fieldName.length);
	            return MapperProvider.get(subResourceName, subFieldName);
	        }
	        if (mapper.refers) {
	            return MapperProvider.get(mapper.refers, fieldName);
	        }
	        else {
	            return mapper[fieldName];
	        }
	    };
	    /**
	     * Checks whether or not the field name is a reserved one. A reserved word does not require a map entry,
	     * since typing information is not required to create the query
	     * @param fieldName The field name
	     */
	    MapperProvider.isReservedFieldName = function (fieldName) {
	        return fieldName === 'page' || fieldName === 'page_size';
	    };
	    return MapperProvider;
	}());
	exports.default = MapperProvider;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var QueryTupleOperation_1 = __webpack_require__(19);
	/**
	 * Given an object key, extract the corresponding operation identifier.
	 * In example, the key is eq_<KEY_NAME>, it extracts the identifier (_eq) and returns the corresponding operation
	 * @param key the key from which the operation identifier will be analysed
	 * @returns {QueryTupleOperation} A QueryTupleOperation (in example, EQUALS)
	 */
	function resolveOperation(key) {
	    if (!containsOperationPrefix(key))
	        return QueryTupleOperation_1.default.EQUALS;
	    var opPrefix = key.substring(0, 2).toLowerCase();
	    switch (opPrefix) {
	        case 'eq': return QueryTupleOperation_1.default.EQUALS;
	        case 'gt': return QueryTupleOperation_1.default.GREATER_THAN;
	        case 'lt': return QueryTupleOperation_1.default.LESSER_THAN;
	        case 'ct': return QueryTupleOperation_1.default.CONTAINS;
	        default: return QueryTupleOperation_1.default.EQUALS;
	    }
	}
	exports.resolveOperation = resolveOperation;
	function containsOperationPrefix(key) {
	    return key.startsWith('eq_') || key.startsWith('gt_') || key.startsWith('lt_') || key.startsWith('ct_');
	}
	exports.containsOperationPrefix = containsOperationPrefix;
	function resolveKey(key) {
	    if (containsOperationPrefix(key)) {
	        return key.substring(3, key.length);
	    }
	    else {
	        return key;
	    }
	}
	exports.resolveKey = resolveKey;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var QueryTupleOperation_1 = __webpack_require__(19);
	var props = __webpack_require__(23);
	var pg = __webpack_require__(27);
	var pool = new pg.Pool(props().postgresql);
	/**
	 * Given a QueryTupleOperation, resolves to the corresponding Postgres operator
	 * @param op QueryTupleOperation
	 * @returns {any} the corresponding operator to be used on query
	 */
	function resolveTupleOperation(op) {
	    switch (op) {
	        case QueryTupleOperation_1.default.CONTAINS: return 'LIKE';
	        case QueryTupleOperation_1.default.EQUALS: return '=';
	        case QueryTupleOperation_1.default.GREATER_THAN: return '>';
	        case QueryTupleOperation_1.default.LESSER_THAN: return '<';
	    }
	}
	exports.resolveTupleOperation = resolveTupleOperation;
	pool.on('error', function (err, client) {
	    console.error('idle client error', err.message, err.stack);
	});
	module.exports.query = function (text, values, callback) {
	    return pool.query(text, values, callback);
	};
	module.exports.connect = function (callback) {
	    return pool.connect(callback);
	};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var local = __webpack_require__(24);
	var dev = __webpack_require__(25);
	var prod = __webpack_require__(26);
	/**
	 * Utility function used to load the corresponding configuration file
	 * @returns {TypeNode|Type|boolean}
	 */
	function properties() {
	    switch (process.env.APP_ENV) {
	        case 'local': return local.default;
	        case 'dev': return dev.default;
	        case 'prod': return prod.default;
	        default: return local.default;
	    }
	}
	module.exports = properties;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "postgresql": {
	        "user": "juan",
	        "database": "autokal",
	        "password": "travel",
	        "host": "localhost",
	        "port": 5432,
	        "max": 10,
	        "idleTimeoutMillis": 30000
	    }
	};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "postgresql": {
	        "user": "juan",
	        "database": "autokal",
	        "password": "travel",
	        "host": "localhost",
	        "port": 5432,
	        "max": 10,
	        "idleTimeoutMillis": 30000
	    }
	};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "postgresql": {
	        "user": "juan",
	        "database": "autokal",
	        "password": "travel",
	        "host": "localhost",
	        "port": 5432,
	        "max": 10,
	        "idleTimeoutMillis": 30000
	    }
	};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = require("pg");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Resource_1 = __webpack_require__(12);
	var EmbeddedResource_1 = __webpack_require__(16);
	var PostgreCriteria_1 = __webpack_require__(17);
	var MessageSocialInfo_1 = __webpack_require__(29);
	var QueryTuple_1 = __webpack_require__(18);
	var QueryTupleOperation_1 = __webpack_require__(19);
	var Profile_1 = __webpack_require__(11);
	var mapper = __webpack_require__(30);
	/**
	 * Message Resource definition
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var Message = (function (_super) {
	    __extends(Message, _super);
	    /**
	     * constructor
	     * @param value
	     * @param date
	     * @param messageSocialInfo
	     * @param profileId
	     * @param id
	     */
	    function Message(value, date, messageSocialInfo, profileId, id) {
	        var _this = _super.call(this, Message.RESOURCE_NAME, id) || this;
	        _this.validate({ value: value, date: date, messageSocialInfo: messageSocialInfo, profileId: profileId, id: id });
	        _this.value = value;
	        _this.date = date;
	        _this.messageSocialInfo = messageSocialInfo;
	        _this.profileId = profileId;
	        return _this;
	    }
	    /**
	     * Define the list of embedded resources of the resource
	     */
	    Message.prototype.embeddeds = function () {
	        return [
	            new EmbeddedResource_1.default('profile', Profile_1.default.RESOURCE_NAME, new PostgreCriteria_1.default([new QueryTuple_1.default('id', this.profileId, 'bigint', QueryTupleOperation_1.default.EQUALS)]))
	        ];
	    };
	    /**
	     * Given an object, attempts to construct a Message instance
	     * @params obj Plain Javascript Object from which this factory method will try to construct an instance of a Message
	     */
	    Message.prototype.create = function (obj) {
	        return Message.create(obj);
	    };
	    /**
	     * Given an object, attempts to construct a Message instance
	     * @params obj Plain Javascript Object from which this factory method will try to construct an instance of a Message
	     */
	    Message.create = function (obj) {
	        return new Message(obj.value, obj.date, MessageSocialInfo_1.default.create(obj), obj.profileid, obj.id);
	    };
	    /**
	     * Given an object, validates that the supplied parameters are valid to construct an instance
	     * @params obj Plain Javascript Object Message object
	     */
	    Message.prototype.validate = function (obj) {
	        return Message.validate(obj);
	    };
	    /**
	     * Given an object, validates that the supplied parameters are valid to construct an instance
	     * @params obj Plain Javascript Object Message object
	     */
	    Message.validate = function (obj) {
	        return;
	    };
	    return Message;
	}(Resource_1.default));
	/**
	 * The name of the resource. This field is particularly important to link the corresponding resource mapper
	 */
	Message.RESOURCE_NAME = 'message';
	exports.default = Message;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * MessageSocialInfo object
	 * //TODO This is not a resource indeed, it would be somewhere else to clearly state that
	 */
	var MessageSocialInfo = (function () {
	    /**
	     * constructor
	     * @param likeCounter # of times message has been marked as like
	     * @param loveCounter # of times message has been marked as love
	     * @param funCounter # of times message has been marked as fun
	     * @param wowCounter # of times message has been marked as wow
	     * @param sadCounter # of times message has been marked as sad
	     * @param angryCounter # of times message has been marked as angry
	     * @param reportCounter # of times message has been reported
	     */
	    function MessageSocialInfo(likeCounter, loveCounter, funCounter, wowCounter, sadCounter, angryCounter, reportCounter) {
	        this.validate({ likeCounter: likeCounter, loveCounter: loveCounter, funCounter: funCounter, wowCounter: wowCounter, sadCounter: sadCounter, angryCounter: angryCounter, reportCounter: reportCounter });
	        this.likeCounter = likeCounter;
	        this.loveCounter = loveCounter;
	        this.funCounter = funCounter;
	        this.wowCounter = wowCounter;
	        this.sadCounter = sadCounter;
	        this.angryCounter = angryCounter;
	        this.reportCounter = reportCounter;
	    }
	    /**
	     * Attempts to create a MessageSocialInfo object from given plain javascript object input
	     * @param obj the object from which it will be tried to be constructed an instance of MessageSocialInfo class
	     * @returns {MessageSocialInfo} instance of MessageSocialInfo class
	     */
	    MessageSocialInfo.prototype.create = function (obj) {
	        return MessageSocialInfo.create(obj);
	    };
	    /**
	     * Attempts to create a MessageSocialInfo object from given plain javascript object input
	     * @param obj the object from which it will be tried to be constructed an instance of MessageSocialInfo class
	     * @returns {MessageSocialInfo} instance of MessageSocialInfo class
	     */
	    MessageSocialInfo.create = function (obj) {
	        return new MessageSocialInfo(parseInt(obj.likecounter), parseInt(obj.lovecounter), parseInt(obj.funcounter), parseInt(obj.wowcounter), parseInt(obj.sadcounter), parseInt(obj.angrycounter), parseInt(obj.reportcounter));
	    };
	    MessageSocialInfo.prototype.validate = function (obj) {
	        return MessageSocialInfo.validate(obj);
	    };
	    MessageSocialInfo.validate = function (obj) {
	        return;
	    };
	    return MessageSocialInfo;
	}());
	exports.default = MessageSocialInfo;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "id": {
	        "type": "bigint",
	        "name": "id"
	    },
	    "value": {
	        "type": "text",
	        "name": "value"
	    },
	    "date": {
	        "type": "bigint",
	        "name": "date"
	    },
	    "profileId": {
	        "type": "bigint",
	        "name": "profileId"
	    },
	    "messageSocialInfo": {
	        "refers": "MessageSocialInfo"
	    }
	};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "id": {
	        "type": "bigint",
	        "name": "id"
	    },
	    "personalInfo": {
	        "refers": "PersonalInfo"
	    }
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var PostgreCriteria_1 = __webpack_require__(17);
	var Response_1 = __webpack_require__(33);
	var ApplicationException_1 = __webpack_require__(13);
	var pool = __webpack_require__(22);
	/**
	 * PostgreSql Repository. Used to provide resource services with operations to interact with a Postgre database
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var PostgreRepository = (function () {
	    /**
	     * constructor
	     * @param name the name of the resource
	     */
	    function PostgreRepository(name) {
	        this.name = name;
	    }
	    /**
	     * @returns {string} the name of the resource
	     */
	    PostgreRepository.prototype.getName = function () {
	        return this.name;
	    };
	    /**
	     * Given an HTTP request and a resource, returns the response to a given query (resolved using a proper criteria)
	     * @param request the HTTP request used to create the criteria that will be used to generate the query to be executed
	     * @param resource the resource
	     * @returns {T[]} A future list of T type resources obtained from repository through a criteria generate query
	     */
	    PostgreRepository.prototype.searchByRequest = function (request, resource) {
	        return __awaiter(this, void 0, void 0, function () {
	            var criteria, res;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        criteria = PostgreCriteria_1.default.create(request, resource);
	                        return [4 /*yield*/, this.search(criteria, resource)];
	                    case 1:
	                        res = _a.sent();
	                        return [2 /*return*/, res];
	                }
	            });
	        });
	    };
	    /**
	     * Given a criteria and a resource, executes a search query
	     * @param criteria criteria object used to generate the query to be executed
	     * @param resource the resource
	     * @returns {Array} list of future resources of type T obtained from repository through a criteria generated query
	     */
	    PostgreRepository.prototype.search = function (criteria, resource) {
	        return __awaiter(this, void 0, void 0, function () {
	            var resolvedCriteria, res, total, resources_1;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        resolvedCriteria = criteria.resolve(this.getName());
	                        return [4 /*yield*/, pool.query(resolvedCriteria.statement, resolvedCriteria.values)];
	                    case 1:
	                        res = _a.sent();
	                        return [4 /*yield*/, pool.query(resolvedCriteria.totalsStatement, resolvedCriteria.values)];
	                    case 2:
	                        total = _a.sent();
	                        if (res.rows.length === 0) {
	                            throw new ApplicationException_1.default("Does not exist any " + this.getName() + " that matches given criteria");
	                        }
	                        else {
	                            resources_1 = [];
	                            res.rows.forEach(function (row) {
	                                resources_1.push(resource.create(row));
	                            });
	                            return [2 /*return*/, new Response_1.default(resources_1, parseInt(total.rows[0].count))];
	                        }
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    PostgreRepository.prototype.create = function (instance) {
	        throw new Error('Method not implemented.');
	    };
	    PostgreRepository.prototype.update = function (id, updatedInstance) {
	        throw new Error('Method not implemented.');
	    };
	    PostgreRepository.prototype.delete = function (id) {
	        throw new Error('Method not implemented.');
	    };
	    return PostgreRepository;
	}());
	exports.default = PostgreRepository;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Response = (function () {
	    function Response(resources, total) {
	        this.resources = resources;
	        this.total = total;
	    }
	    Response.prototype.getResources = function () {
	        return this.resources;
	    };
	    Response.prototype.getTotal = function () {
	        return this.total;
	    };
	    return Response;
	}());
	exports.default = Response;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var RouterFactory_1 = __webpack_require__(8);
	/**
	 * Method level decorator responsible to attach routes to resource services.
	 * @param verb the HTTP verb (GET, PUT, POST, etc...)
	 * @param urls A list or a single url matching pattern. In example: /person/:id
	 */
	function route(verb, urls) {
	    return function (target, propertyKey, descriptor) {
	        RouterFactory_1.default.create(verb, urls, target[propertyKey]);
	    };
	}
	exports.default = route;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(14);
	var Application_1 = __webpack_require__(2);
	var HalHandler = (function () {
	    function HalHandler() {
	    }
	    /**
	     * Given a list of HAL resources, creates a HAL collection of them
	     * @param resources the list of the resources to be added to the
	     * @returns {{_embedded: {items: Array}, _links: {}}}
	     */
	    HalHandler.toHalCollection = function (resources, total, req) {
	        return __awaiter(this, void 0, void 0, function () {
	            var halCollection, i, r;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        halCollection = {
	                            _embedded: {
	                                items: []
	                            },
	                            _links: {
	                                "total_results": total,
	                                "page_size": parseInt(req.query['page_size']),
	                                "total_pages": total / parseInt(req.query['page_size']) < 1 ? 1 : total / total / parseInt(req.query['page_size']),
	                                "current_page": utils_1.removeDuplicatedSlashes(Application_1.default.HOST + "/v" + Application_1.default.API_VERSION + "/" + req.path + utils_1.toQueryString(req))
	                            },
	                        };
	                        i = 0;
	                        _a.label = 1;
	                    case 1:
	                        if (!(i < resources.length)) return [3 /*break*/, 4];
	                        return [4 /*yield*/, resources[i].toHal(true)];
	                    case 2:
	                        r = _a.sent();
	                        halCollection._embedded.items.push(r);
	                        _a.label = 3;
	                    case 3:
	                        i++;
	                        return [3 /*break*/, 1];
	                    case 4: return [2 /*return*/, halCollection];
	                }
	            });
	        });
	    };
	    /**
	     * Given a resource service, an HTTP request, an HTTP response handler and a resource, processes it
	     * @param service the resource service
	     * @param req the HTTP request object
	     * @param res the HTTP response object
	     * @param resource a resource
	     */
	    HalHandler.process = function (service, req, res, resource) {
	        return __awaiter(this, void 0, void 0, function () {
	            var response, r, halCollection, err_1;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        utils_1.injectIdParams(req);
	                        _a.label = 1;
	                    case 1:
	                        _a.trys.push([1, 7, , 8]);
	                        return [4 /*yield*/, service.searchByRequest(req, resource)];
	                    case 2:
	                        response = _a.sent();
	                        if (!req.params.id) return [3 /*break*/, 4];
	                        return [4 /*yield*/, response.getResources()[0].toHal(true)];
	                    case 3:
	                        r = _a.sent();
	                        res.send(r);
	                        return [3 /*break*/, 6];
	                    case 4: return [4 /*yield*/, HalHandler.toHalCollection(response.getResources(), response.getTotal(), req)];
	                    case 5:
	                        halCollection = _a.sent();
	                        res.send(halCollection);
	                        _a.label = 6;
	                    case 6: return [3 /*break*/, 8];
	                    case 7:
	                        err_1 = _a.sent();
	                        res.send(err_1.toHal());
	                        return [3 /*break*/, 8];
	                    case 8: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    return HalHandler;
	}());
	exports.default = HalHandler;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var Message_1 = __webpack_require__(28);
	var PostgreRepository_1 = __webpack_require__(32);
	var Method_1 = __webpack_require__(9);
	var route_1 = __webpack_require__(34);
	var HalHandler_1 = __webpack_require__(35);
	var __this;
	/**
	 * Service for Message resource
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var MessageService = (function (_super) {
	    __extends(MessageService, _super);
	    /**
	     * constructor
	     */
	    function MessageService() {
	        var _this = _super.call(this, Message_1.default.RESOURCE_NAME) || this;
	        __this = _this;
	        return _this;
	    }
	    /**
	     * @returns {Message} the resource to which this service is bind to
	     */
	    MessageService.prototype.getResource = function () {
	        return Message_1.default;
	    };
	    /**
	     * HTTP route
	     * @param req HTTP request
	     * @param res HTTP response
	     * @param next callback handler
	     */
	    MessageService.prototype.searchForMessages = function (req, res, next) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                HalHandler_1.default.process(__this, req, res, Message_1.default);
	                return [2 /*return*/];
	            });
	        });
	    };
	    return MessageService;
	}(PostgreRepository_1.default));
	__decorate([
	    route_1.default(Method_1.default.GET, ['/profile/:profileId/message', '/profile/:profileId/message/:id']),
	    __metadata("design:type", Function),
	    __metadata("design:paramtypes", [Object, Object, Object]),
	    __metadata("design:returntype", Promise)
	], MessageService.prototype, "searchForMessages", null);
	exports.default = MessageService;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var Trending_1 = __webpack_require__(38);
	var PostgreRepository_1 = __webpack_require__(32);
	var Method_1 = __webpack_require__(9);
	var route_1 = __webpack_require__(34);
	var HalHandler_1 = __webpack_require__(35);
	var __this;
	var TrendingService = (function (_super) {
	    __extends(TrendingService, _super);
	    function TrendingService() {
	        var _this = _super.call(this, Trending_1.default.RESOURCE_NAME) || this;
	        __this = _this;
	        return _this;
	    }
	    TrendingService.prototype.getResource = function () {
	        return Trending_1.default;
	    };
	    TrendingService.prototype.getTrendings = function (req, res, next) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                HalHandler_1.default.process(__this, req, res, Trending_1.default);
	                return [2 /*return*/];
	            });
	        });
	    };
	    return TrendingService;
	}(PostgreRepository_1.default));
	__decorate([
	    route_1.default(Method_1.default.GET, ['/trending/:id', '/trending']),
	    __metadata("design:type", Function),
	    __metadata("design:paramtypes", [Object, Object, Object]),
	    __metadata("design:returntype", Promise)
	], TrendingService.prototype, "getTrendings", null);
	exports.default = TrendingService;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Resource_1 = __webpack_require__(12);
	var mapper = __webpack_require__(39);
	/**
	 * Trending Resource definition
	 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
	 */
	var Trending = (function (_super) {
	    __extends(Trending, _super);
	    /**
	     * constructor
	     * @param image Image of the trending event
	     * @param title Title of the trending event
	     * @param location Location of the trending event
	     * @param fans Number of current fans on the trending event
	     * @param id the id of the resource
	     */
	    function Trending(image, title, location, fans, id) {
	        var _this = _super.call(this, Trending.RESOURCE_NAME, id) || this;
	        _this.validate({ image: image, title: title, location: location, id: id });
	        _this.image = image;
	        _this.title = title;
	        _this.location = location;
	        _this.fans = fans;
	        return _this;
	    }
	    /**
	     * Attempts to create a Trending object from given plain javascript object input
	     * @param obj the object from which it will be tried to be constructed an instance of Trending class
	     * @returns {Trending} instance of Trending class
	     */
	    Trending.prototype.create = function (obj) {
	        return Trending.create(obj);
	    };
	    /**
	     * Attempts to create a Trending object from given plain javascript object input
	     * @param obj the object from which it will be tried to be constructed an instance of Trending class
	     * @returns {Trending} instance of Trending class
	     */
	    Trending.create = function (obj) {
	        return new Trending(obj.image, obj.title, obj.location, parseInt(obj.fans), obj.id);
	    };
	    /**
	     * Validates whether or not supplied object contains valid parameters to construct a Trending instance
	     * @param obj object to be validated
	     */
	    Trending.prototype.validate = function (obj) {
	        return;
	    };
	    /**
	     * Defines the list of embedded resources of the Trending resource
	     * @returns {EmbeddedResource[]} list of EmbeddedResource
	     */
	    Trending.prototype.embeddeds = function () {
	        return [];
	    };
	    return Trending;
	}(Resource_1.default));
	/**
	 * @type {string} the name of the resource
	 */
	Trending.RESOURCE_NAME = 'trending';
	exports.default = Trending;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "id": {
	        "type": "bigint",
	        "name": "id"
	    },
	    "image": {
	        "type": "text",
	        "name": "image"
	    },
	    "title": {
	        "type": "text",
	        "name": "title"
	    },
	    "location": {
	        "type": "text",
	        "name": "location"
	    },
	    "fans": {
	        "type": "bigint",
	        "name": "fans"
	    }
	};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "likeCounter": {
	        "type": "bigint",
	        "name": "likecounter"
	    },
	    "loveCounter": {
	        "type": "bigint",
	        "name": "lovecounter"
	    },
	    "funCounter": {
	        "type": "bigint",
	        "name": "funcounter"
	    },
	    "wowCounter": {
	        "type": "bigint",
	        "name": "wowcounter"
	    },
	    "sadCounter": {
	        "type": "bigint",
	        "name": "sancounter"
	    },
	    "angryCounter": {
	        "type": "bigint",
	        "name": "angrycounter"
	    },
	    "reportCounter": {
	        "type": "bigint",
	        "name": "reportcounter"
	    }
	};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "name": {
	        "type": "text",
	        "name": "name"
	    },
	    "lastName": {
	        "type": "text",
	        "name": "lastname"
	    },
	    "email": {
	        "type": "text",
	        "name": "email"
	    },
	    "age": {
	        "type": "bigint",
	        "name": "age"
	    },
	    "bio": {
	        "type": "text",
	        "name": "bio"
	    },
	    "photo": {
	        "type": "text",
	        "name": "photo"
	    }
	};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	const root = __webpack_require__(43).path;
	
	module.exports = {
	    entry: `${root}/src/start.ts`,
	    target: 'node',
	    externals: [
	        /^[a-z\-0-9]+$/ // Ignore node_modules folder
	    ],
	    output: {
	        filename: 'app.js',
	        path: `${root}/build`,
	        libraryTarget: "commonjs"
	    },
	    resolve: {
	        // Add in `.ts` and `.tsx` as a resolvable extension.
	        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
	    },
	    resolveLoader: {
	        root: [`${root}/node_modules`]
	    },
	    module: {
	        loaders: [{
	            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
	            test: /\.tsx?$/,
	            exclude: 'node_modules',
	            loader: 'ts-loader'
	        }]
	    },
	    devtool: '#source-map'
	};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	module.exports = require("app-root-path");

/***/ })
/******/ ])));
//# sourceMappingURL=app.js.map