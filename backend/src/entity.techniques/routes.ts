import express from 'express';
import Controller from './controller';

// -- Not protected routes --
export const notProtectedRoutes = express.Router();

// -- User protected routes --
export const userProtectedRoutes = express.Router();

/**
 * GET /v1/techniques
 * @summary Retrieve a list of techniques
 * @tags TECHNIQUES
 * @return {array<object>} 200 - Success - An array of techniques
 * @example response - 200 - Example of response
 * [
 *   {
 *     "_id": "613b1fcf8f1d1e2f4a12b3c7",
 *     "name": "Pomodoro",
 *     "description": "A time management technique.",
 *     "focus_time": 25,
 *     "break_time": 5,
 *     "long_break_time": 15,
 *     "cycles_before_long_break": 4,
 *     "active_pause": true
 *   },
 *   {
 *     "_id": "613b1fcf8f1d1e2f4a12b3c8",
 *     "name": "Time Blocking",
 *     "description": "Allocating blocks of time for tasks.",
 *     "focus_time": 60,
 *     "break_time": 10,
 *     "long_break_time": 30,
 *     "cycles_before_long_break": 2,
 *     "active_pause": false
 *   }
 * ]
 */
userProtectedRoutes.get('/techniques', Controller.get);

/**
 * POST /v1/techniques/register
 * @summary Register a new technique
 * @tags TECHNIQUES
 * @param {object} request.body.required - Technique details
 * @example request - Example of request body
 * {
 *   "name": "Pomodoro",
 *   "description": "A time management technique.",
 *   "focus_time": 25,
 *   "break_time": 5,
 *   "long_break_time": 15,
 *   "cycles_before_long_break": 4,
 *   "active_pause": true
 * }
 * @return {object} 201 - Technique created
 * @example response - 201 - Example of response
 * {
 *   "success": true,
 *   "message": "Technique created.",
 *   "data": {
 *     "_id": "613b1fcf8f1d1e2f4a12b3c7",
 *     "name": "Pomodoro",
 *     "description": "A time management technique.",
 *     "focus_time": 25,
 *     "break_time": 5,
 *     "long_break_time": 15,
 *     "cycles_before_long_break": 4,
 *     "active_pause": true
 *   }
 * }
 * @return {object} 400 - Invalid data
 * @example response - 400 - Example of error response
 * {
 *   "success": false,
 *   "message": "Name is required."
 * }
 * @return {object} 500 - Internal server error
 * @example response - 500 - Example of error response
 * {
 *   "success": false,
 *   "message": "Internal server error."
 * }
 */
userProtectedRoutes.post('/techniques/register', Controller.register);

/**
 * PUT /v1/techniques/update/{id}
 * @summary Update an existing technique
 * @tags TECHNIQUES
 * @param {string} id.path.required - Technique ID
 * @param {object} request.body.required - Updated technique details
 * @example request - Example of request body
 * {
 *   "name": "Pomodoro",
 *   "description": "A time management technique.",
 *   "focus_time": 25,
 *   "break_time": 5,
 *   "long_break_time": 15,
 *   "cycles_before_long_break": 4,
 *   "active_pause": true
 * }
 * @return {object} 200 - Technique updated
 * @example response - 200 - Example of response
 * {
 *   "success": true,
 *   "message": "Technique updated."
 * }
 * @return {object} 400 - Invalid data
 * @example response - 400 - Example of error response
 * {
 *   "success": false,
 *   "message": "Invalid focus time."
 * }
 * @return {object} 404 - Technique not found
 * @example response - 404 - Example of response
 * {
 *   "success": false,
 *   "message": "Technique not updated."
 * }
 * @return {object} 500 - Internal server error
 * @example response - 500 - Example of error response
 * {
 *   "success": false,
 *   "message": "Internal server error."
 * }
 */
userProtectedRoutes.put('/techniques/update/:id', Controller.update);


// -- Admin protected routes --
export const adminProtectedRoutes = express.Router();

/**
 * POST /v1/techniques/admin/register
 * @summary Register a new technique
 * @tags TECHNIQUES
 * @param {object} request.body.required - Technique details
 * @example request - Example of request body
 * {
 *   "name": "Pomodoro",
 *   "description": "A time management technique.",
 *   "focus_time": 25,
 *   "break_time": 5,
 *   "long_break_time": 15,
 *   "cycles_before_long_break": 4,
 *   "active_pause": true
 * }
 * @return {object} 201 - Technique created
 * @example response - 201 - Example of response
 * {
 *   "success": true,
 *   "message": "Technique created.",
 *   "data": {
 *     "_id": "613b1fcf8f1d1e2f4a12b3c7",
 *     "name": "Pomodoro",
 *     "description": "A time management technique.",
 *     "focus_time": 25,
 *     "break_time": 5,
 *     "long_break_time": 15,
 *     "cycles_before_long_break": 4,
 *     "active_pause": true
 *   }
 * }
 * @return {object} 400 - Invalid data
 * @example response - 400 - Example of error response
 * {
 *   "success": false,
 *   "message": "Name is required."
 * }
 * @return {object} 500 - Internal server error
 * @example response - 500 - Example of error response
 * {
 *   "success": false,
 *   "message": "Internal server error."
 * }
 */
adminProtectedRoutes.post('/techniques/admin/register', Controller.register);

/**
 * PUT /v1/techniques/admin/update/{id}
 * @summary Update an existing technique
 * @tags TECHNIQUES
 * @param {string} id.path.required - Technique ID
 * @param {object} request.body.required - Updated technique details
 * @example request - Example of request body
 * {
 *   "name": "Pomodoro",
 *   "description": "A time management technique.",
 *   "focus_time": 25,
 *   "break_time": 5,
 *   "long_break_time": 15,
 *   "cycles_before_long_break": 4,
 *   "active_pause": true
 * }
 * @return {object} 200 - Technique updated
 * @example response - 200 - Example of response
 * {
 *   "success": true,
 *   "message": "Technique updated."
 * }
 * @return {object} 400 - Invalid data
 * @example response - 400 - Example of error response
 * {
 *   "success": false,
 *   "message": "Invalid focus time."
 * }
 * @return {object} 404 - Technique not found
 * @example response - 404 - Example of response
 * {
 *   "success": false,
 *   "message": "Technique not updated."
 * }
 * @return {object} 500 - Internal server error
 * @example response - 500 - Example of error response
 * {
 *   "success": false,
 *   "message": "Internal server error."
 * }
 */
userProtectedRoutes.put('/techniques/admin/update/:id', Controller.update);
