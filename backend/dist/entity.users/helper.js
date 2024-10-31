"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelper = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserHelper {
    constructor() { }
    static comparePassword(password, savedPassword) {
        return bcrypt_1.default.compareSync(password, savedPassword);
    }
    static generateToken(user) {
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
        return token;
    }
}
exports.UserHelper = UserHelper;
