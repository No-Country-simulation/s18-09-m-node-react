"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProtectedRoutes = exports.userProtectedRoutes = exports.notProtectedRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
// -- Not protected routes --
exports.notProtectedRoutes = express_1.default.Router();
// -- User protected routes --
exports.userProtectedRoutes = express_1.default.Router();
/**
 * GET /v1/sessions
 * @summary Retrieve a list of sessions
 * @tags SESSIONS
 * @return {object} 200 - Success response with array of sessions
 * @example response - 200 - Example of successful response
 * {
 *   "sessions": [
 *     {
 *       "_id": "613b1fcf8f1d1e2f4a12b3c7",
 *       "user_id": "613b1fcf8f1d1e2f4a12b3c6",
 *       "technique_id": "613b1fcf8f1d1e2f4a12b3c5",
 *       "start_time": "2024-10-01T10:00:00Z",
 *       "end_time": "2024-10-01T10:30:00Z",
 *       "real_focus_time": 25,
 *       "real_break_time": 5,
 *       "real_break_count": 1,
 *       "finished": true,
 *       "score": 85
 *     },
 *     {
 *       "_id": "613b1fcf8f1d1e2f4a12b3c8",
 *       "user_id": "613b1fcf8f1d1e2f4a12b3c6",
 *       "technique_id": "613b1fcf8f1d1e2f4a12b3c5",
 *       "start_time": "2024-10-02T14:00:00Z",
 *       "end_time": "2024-10-02T14:45:00Z",
 *       "real_focus_time": 40,
 *       "real_break_time": 5,
 *       "real_break_count": 1,
 *       "finished": true,
 *       "score": 90
 *     }
 *   ]
 * }
 */
exports.userProtectedRoutes.get('/sessions', controller_1.default.get);
exports.userProtectedRoutes.get('/sessions/:id', controller_1.default.getSessionsByUserId);
/**
 * POST /v1/sessions/register
 * @summary Register a new session
 * @tags SESSIONS
 * @param {object} request.body.required - Session details
 * @example request - Example of request body
 * {
 *   "user_id": "613b1fcf8f1d1e2f4a12b3c6",
 *   "technique_id": "613b1fcf8f1d1e2f4a12b3c5",
 *   "start_time": "2024-10-01T10:00:00Z",
 *   "end_time": "2024-10-01T10:30:00Z",
 *   "expected_total_time": 30,
 *   "real_focus_time": 25,
 *   "real_break_time": 5,
 *   "real_break_count": 1,
 *   "finished": true,
 *   "score": 85
 * }
 * @return {object} 201 - Session created
 * @example response - 201 - Example of response
 * {
 *   "success": true,
 *   "message": "Session created.",
 *   "data": {
 *     "_id": "613b1fcf8f1d1e2f4a12b3c7",
 *     "user_id": "613b1fcf8f1d1e2f4a12b3c6",
 *     "technique_id": "613b1fcf8f1d1e2f4a12b3c5",
 *     "start_time": "2024-10-01T10:00:00Z",
 *     "end_time": "2024-10-01T10:30:00Z",
 *     "expected_total_time": 30,
 *     "real_focus_time": 25,
 *     "real_break_time": 5,
 *     "real_break_count": 1,
 *     "finished": true,
 *     "score": 85
 *   }
 * }
 * @return {object} 400 - Invalid data
 * @example response - 400 - Example of error response
 * {
 *   "success": false,
 *   "message": "User ID is required."
 * }
 * @return {object} 500 - Internal server error
 * @example response - 500 - Example of error response
 * {
 *   "success": false,
 *   "message": "Internal server error."
 * }
 */
exports.userProtectedRoutes.post('/sessions/register', controller_1.default.register);
// -- Admin protected routes --
exports.adminProtectedRoutes = express_1.default.Router();
/**
 * PUT /v1/sessions/update/{id}
 * @summary Update an existing session
 * @tags SESSIONS
 * @param {string} id.path.required - Session ID
 * @param {object} request.body.required - Updated session details
 * @example request - Example of request body
 * {
 *   "user_id": "613b1fcf8f1d1e2f4a12b3c6",
 *   "technique_id": "613b1fcf8f1d1e2f4a12b3c5",
 *   "start_time": "2024-10-01T10:00:00Z",
 *   "end_time": "2024-10-01T10:30:00Z",
 *   "expected_total_time": 30,
 *   "real_focus_time": 25,
 *   "real_break_time": 5,
 *   "real_break_count": 1,
 *   "finished": true,
 *   "score": 85
 * }
 * @return {object} 200 - Session updated
 * @example response - 200 - Example of response
 * {
 *   "success": true,
 *   "message": "Session updated."
 * }
 * @return {object} 400 - Invalid data
 * @example response - 400 - Example of error response
 * {
 *   "success": false,
 *   "message": "Invalid focus time."
 * }
 * @return {object} 404 - Session not found
 * @example response - 404 - Example of response
 * {
 *   "success": false,
 *   "message": "Session not updated."
 * }
 * @return {object} 500 - Internal server error
 * @example response - 500 - Example of error response
 * {
 *   "success": false,
 *   "message": "Internal server error."
 * }
 */
exports.adminProtectedRoutes.put('/sessions/update/:id', controller_1.default.update);
