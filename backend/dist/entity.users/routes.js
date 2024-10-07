"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProtectedRoutes = exports.userProtectedRoutes = exports.notProtectedRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_js_1 = __importDefault(require("./controller.js"));
// -- Not protected routes --
exports.notProtectedRoutes = express_1.default
    .Router()
    .post('/auth/login', controller_js_1.default.login)
    .post('/auth/register', controller_js_1.default.register);
// -- User protected routes --
exports.userProtectedRoutes = express_1.default
    .Router()
    .get('/users/getByToken', controller_js_1.default.getByToken)
    .put('/users/update', controller_js_1.default.update);
// -- Admin protected routes --
exports.adminProtectedRoutes = express_1.default
    .Router()
    .get('/users', controller_js_1.default.get)
    .get('users/:id', controller_js_1.default.get)
    .post('users/admin/register', controller_js_1.default.register)
    .put('users/admin/update/:id', controller_js_1.default.update);
