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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const model_1 = require("../model");
const mailer_1 = require("../mailer");
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingUsers = yield model_1.User.find({
                $or: [
                    { email: user.email },
                    { username: user.username }
                ]
            }).exec();
            if (existingUsers.length > 0)
                throw new Error("User already exists.");
            const newUser = new model_1.User(user);
            const registeredUser = yield newUser.save();
            if (!registeredUser)
                throw new Error("Unable to register user.");
            if (registeredUser) {
                const password = registeredUser.password;
                yield (0, mailer_1.sendMailRegister)(registeredUser.email, password);
            }
            return registeredUser;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.register = register;
