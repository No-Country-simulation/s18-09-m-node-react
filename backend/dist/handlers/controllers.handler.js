"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../constants/httpStatusCodes"));
class ControllerHandler {
    constructor() { }
    static ok(message, res, data, token) {
        const response = { success: true, message };
        if (data)
            response.data = data;
        if (token)
            response.token = token;
        return res.status(httpStatusCodes_1.default.OK).json(response);
    }
    static created(message, data, res) {
        return res.status(httpStatusCodes_1.default.CREATED).json({
            success: true,
            message,
            data
        });
    }
    static badRequest(message, res) {
        return res.status(httpStatusCodes_1.default.BAD_REQUEST).json({
            success: false,
            message
        });
    }
    static notFound(message, res) {
        return res.status(httpStatusCodes_1.default.NOT_FOUND).json({
            success: false,
            message
        });
    }
}
exports.default = ControllerHandler;
