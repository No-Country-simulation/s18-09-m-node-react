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
class Controller {
    constructor() { }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessions = yield (0, service_1.get)();
                if (sessions.length > 0)
                    return controllers_handler_1.default.ok('Sessions found.', res, sessions);
                return controllers_handler_1.default.notFound('Sessions not found.', res);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getSessionsByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params.id;
                const sessions = yield (0, service_1.getSessionsByUserId)(user_id);
                if (sessions.length > 0)
                    return controllers_handler_1.default.ok('Sessions found.', res, sessions);
                return controllers_handler_1.default.notFound('Sessions not found.', res);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = yield dto_1.default.register(req.body);
            if (error)
                return controllers_handler_1.default.badRequest(error.message, res);
            try {
                const userData = yield (0, service_1.register)(value);
                return controllers_handler_1.default.created('Session created.', userData, res);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const session_id = req.params.id;
            const { error, value } = dto_1.default.update(req.body, session_id);
            if (error)
                return controllers_handler_1.default.badRequest(error.message, res);
            try {
                const result = yield (0, service_1.update)(value);
                if (result)
                    return controllers_handler_1.default.ok('Session updated.', res);
                return controllers_handler_1.default.notFound('Session not updated.', res);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = Controller;
