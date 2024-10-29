"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.forgetPassword = void 0;
const model_1 = require("../model");
const mailer_1 = require("../mailer");
const bcrypt = __importStar(require("bcrypt"));
const environment_1 = require("../../config/environment");
function forgetPassword(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingUsers = yield model_1.User.find({
                $or: [
                    { email: email }
                ]
            }).exec();
            if (existingUsers.length > 0) {
                function generateRandomPassword(length = 8) {
                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
                    let password = '';
                    for (let i = 0; i < length; i++) {
                        password += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    return password;
                }
                const newPassword = generateRandomPassword(8);
                // Hashear la nueva contraseña
                const hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(environment_1.BCRYPT_ROUNDS));
                // Actualizar la contraseña del usuario
                yield model_1.User.findByIdAndUpdate(existingUsers[0]._id, { password: hashPassword });
                // Enviar el correo con la nueva contraseña
                yield (0, mailer_1.sendMailForget)(email, newPassword);
                return { success: true, message: "Password reset email sent. Check email.", hashPassword };
            }
            else {
                return { success: false, message: "User not found.", };
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.forgetPassword = forgetPassword;
