"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const httpStatusCodes_1 = __importDefault(require("../constants/httpStatusCodes"));
function errorHandler(error, req, res, next) {
    var _a, _b, _c;
    console.log(error.stack);
    res.status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Internal server error.",
        error: (_c = (_b = (_a = error.errors) === null || _a === void 0 ? void 0 : _a.map((e) => e.message).join(", ")) !== null && _b !== void 0 ? _b : error.name) !== null && _c !== void 0 ? _c : "InternalServerError"
    });
}
exports.errorHandler = errorHandler;
