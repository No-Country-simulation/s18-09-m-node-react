"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_handler_1 = __importDefault(require("../handlers/controllers.handler"));
const dto_1 = __importDefault(require("./dto"));
const service_1 = require("./service");
const forget_1 = require("./service/forget");
class Controller {
    constructor() { }
    // -- Register a new user --
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value, password } = dto_1.default.register(req.body);
            if (error)
                return controllers_handler_1.default.badRequest(error.message, res);
            try {
                const userData = yield (0, service_1.register)(value, password);
                return controllers_handler_1.default.created("User created.", userData, res);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // -- Forget password --
    static forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const result = yield (0, forget_1.forgetPassword)(email);
                if (result.success) {
                    return controllers_handler_1.default.created("Password reset email sent.", result, res);
                }
                else {
                    return controllers_handler_1.default.badRequest(result.message, res); // Usuario no encontrado
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    // -- Login a user --
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = dto_1.default.login(req.body);
            if (error)
                return controllers_handler_1.default.badRequest(error.message, res);
            try {
                const { userData, token } = yield (0, service_1.login)(value);
                return controllers_handler_1.default.ok("User logged in.", res, userData, token);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // -- Update user --
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.params.id ? { id: req.params.id } : req.user;
            const { error, value } = dto_1.default.update(req.body, user_id);
            if (error)
                return controllers_handler_1.default.badRequest(error.message, res);
            try {
                const result = yield (0, service_1.update)(value);
                if (result)
                    return controllers_handler_1.default.ok("User updated.", res);
                return controllers_handler_1.default.notFound("User not updated.", res);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // -- Get user/s --
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params.id ? parseInt(req.params.id) : null;
                const users = yield (0, service_1.get)(user_id);
                if (users)
                    return controllers_handler_1.default.ok("Users found.", res, users);
                return controllers_handler_1.default.notFound("Users not found.", res);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // -- Get by token --
    static getByToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = dto_1.default.getByToken(req.user);
                if (error)
                    return controllers_handler_1.default.badRequest(error.message, res);
                const result = yield (0, service_1.get)(value);
                if (result)
                    return controllers_handler_1.default.ok("User found.", res, result);
                return controllers_handler_1.default.notFound("User not found.", res);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = Controller;
