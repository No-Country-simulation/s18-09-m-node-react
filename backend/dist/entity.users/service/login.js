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
exports.login = void 0;
const memory_storage_1 = __importDefault(require("../../storage/memory.storage"));
const model_1 = require("../model");
const helper_1 = require("../helper");
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const remainingLoginAttempts = memory_storage_1.default.addLoginAttempt(user.email);
            if (remainingLoginAttempts === -1) {
                throw new Error("Too many login attempts. Please try again later.");
            }
            const getUser = yield model_1.User.findOne({ email: user.email }).exec();
            if (!getUser)
                throw new Error("Invalid credentials. Remaining login attempts: " + remainingLoginAttempts);
            const passwordMatch = helper_1.UserHelper.comparePassword(user.password, getUser.password);
            if (!passwordMatch)
                throw new Error("Invalid credentials. Remaining login attempts: " + remainingLoginAttempts);
            memory_storage_1.default.deleteLoginAttempts(user.email);
            const token = helper_1.UserHelper.generateToken(getUser);
            return { userData: Object.assign(Object.assign({}, getUser.toJSON()), { password: null }), token };
        }
        catch (err) {
            throw err;
        }
    });
}
exports.login = login;
