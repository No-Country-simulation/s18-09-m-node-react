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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const environment_1 = require("../config/environment");
const model_1 = require("./model");
class DTO {
    constructor() { }
    static checkPassword(password) {
        //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //return passwordRegex.test(password);
        return password.length >= 8;
    }
    static register(data) {
        const { email, username, password, role } = data;
        if (!email || !username || !password) {
            return {
                error: {
                    message: "All fields are required: email, username and password."
                },
                value: null
            };
        }
        if (!this.checkPassword(password)) {
            return {
                error: {
                    message: "Password must be at least 8 characters long."
                },
                value: null
            };
        }
        const hashPassword = bcrypt.hashSync(password, this.salt);
        const userRole = role && (role in model_1.UserRole) ? role : model_1.UserRole.USER;
        return {
            error: null,
            value: {
                email,
                username,
                password: hashPassword,
                role: userRole,
                active: true
            }
        };
    }
    static login(data) {
        const { email, password } = data;
        if (!email || !password)
            return {
                error: {
                    message: "All fields are required: email and password."
                }
            };
        return {
            error: null,
            value: {
                email,
                password
            }
        };
    }
    static update(data, user) {
        const { email, username, password, role, active } = data;
        if (!email && !username && !password && !role && !active || !user.id)
            return {
                error: {
                    message: "A least one field is required: email, username, password, role and active."
                }
            };
        if (password && !this.checkPassword(password))
            return {
                error: {
                    message: "Password must be at least 8 characters long."
                }
            };
        if (role && !(role in model_1.UserRole))
            return {
                error: {
                    message: role + " role, doesn't have permissions."
                }
            };
        const response = {
            id: parseInt(user.id),
            updatedAt: new Date()
        };
        if (email)
            response.email = email;
        if (username)
            response.username = username;
        if (password)
            response.password = bcrypt.hashSync(password, this.salt);
        if (role)
            response.role = role;
        if (active)
            response.active = active;
        return {
            error: null,
            value: response,
        };
    }
    static getByToken(user) {
        const { id } = user;
        if (!id)
            return {
                error: {
                    message: "User not found."
                }
            };
        return {
            error: null,
            value: parseInt(id)
        };
    }
}
DTO.salt = bcrypt.genSaltSync(environment_1.BCRYPT_ROUNDS);
exports.default = DTO;
