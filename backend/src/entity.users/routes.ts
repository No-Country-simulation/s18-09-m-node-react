import express from 'express';

import Controller from './controller.js';

// -- Not protected routes --
export const notProtectedRoutes = express
  .Router()
  .post('/auth/login', Controller.login)

  /**
   * POST /auth/register
   * @summary Register a new user
   * @tags AUTH
   * @param {object} request.body.required - User details
   * @example request - Example of request body
   * {
   *    "username": "admin",
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
   *       "username": "admin1",
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
  .post('/auth/register', Controller.register)

// -- User protected routes --
export const userProtectedRoutes = express
  .Router()
  .get('/users/getByToken', Controller.getByToken)
  .put('/users/update', Controller.update)

// -- Admin protected routes --
export const adminProtectedRoutes = express
  .Router()
  .get('/users', Controller.get)
  .get('users/:id', Controller.get)
  .post('users/admin/register', Controller.register)
  .put('users/admin/update/:id', Controller.update)



