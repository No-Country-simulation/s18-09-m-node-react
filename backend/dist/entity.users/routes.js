"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProtectedRoutes = exports.userProtectedRoutes = exports.notProtectedRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
// -- Not protected routes --
exports.notProtectedRoutes = express_1.default
    .Router()
    /**
   * POST /v1/auth/login
   * @summary User login
   * @tags AUTH
   * @param {object} request.body.required - User login details
   * @example request - Example of request body
   * {
   *   "email": "user@example.com",
   *   "password": "userpassword123"
   * }
   * @return {object} 200 - Successful login
   * @return {object} 400 - Invalid credentials
   * @return {object} 500 - Internal server error
   * @example response - 200 - Example of successful login response
   * {
   *   "success": true,
   *   "message": "Login successful.",
   *   "data": {
   *     "user": {
   *       "id": "1234567890abcdef",
   *       "email": "user@example.com",
   *       "username": "user123",
   *       "role": "USER",
   *       "active": true,
   *       "createdAt": "2024-10-08T15:34:31.952Z",
   *       "updatedAt": "2024-10-08T15:34:31.952Z"
   *     },
   *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   *   }
   * }
   * @example response - 400 - Example of invalid credentials response
   * {
   *   "success": false,
   *   "message": "Invalid email or password."
   * }
   * @example response - 500 - Example of internal server error response
   * {
   *   "success": false,
   *   "message": "Internal server error."
   * }
   */
    .post('/auth/login', controller_1.default.login)
    /**
     * POST /v1/auth/register
     * @summary Register a new user
     * @tags AUTH
     * @param {object} request.body.required - User details
     * @example request - Example of request body
     * {
     *    "email": "admin@admin.com",
     *    "password": "admin1234"
     * }
     * @return {object} 201 - User created
     * @return {object} 400 - Invalid data
     * @return {object} 500 - Internal server error
     * @example response - 201 - Example of response
     * {
     *   "success": true,
     *   "message": "User created.",
     *   "data": {
     *       "email": "admin@admin1.com",
     *       "username": "admin",
     *       "role": "USER",
     *       "active": true,
     *       "_id": "67055107fab86d2fd48a4d7e",
     *       "createdAt": "2024-10-08T15:34:31.952Z",
     *       "updatedAt": "2024-10-08T15:34:31.952Z",
     *       "__v": 0
     *   }
     * }
     * @example response - 400 - Example of response
     * {
     *   "success": false,
     *   "message": "All fields are required: email, username and password."
     * }
     * @example response - 500 - Example of response
     * {
     *   "success": false,
     *   "message": "Internal server error."
     * }
     */
    .post('/auth/register', controller_1.default.register);
// -- User protected routes --
exports.userProtectedRoutes = express_1.default
    .Router()
    .get('/users/getByToken', controller_1.default.getByToken)
    .put('/users/update', controller_1.default.update);
// -- Admin protected routes --
exports.adminProtectedRoutes = express_1.default
    .Router()
    .get('/users', controller_1.default.get)
    .get('users/:id', controller_1.default.get)
    .post('users/admin/register', controller_1.default.register)
    .put('users/admin/update/:id', controller_1.default.update);
