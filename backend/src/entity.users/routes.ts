import express from 'express';

import Controller from './controller';

// -- Not protected routes --
export const notProtectedRoutes = express
  .Router()

  /**
 * POST /v1/auth/login
 * @summary User login
 * @tags AUTH PUBLIC
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
 *       "updatedAt": "2024-10-08T15:34:31.952Z",
 *       "alarm": "Birds",
 *       "background": "#DFF7F2",
 *       "background_color": true,
 *       "techniques": []
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
  .post('/auth/login', Controller.login)

  /**
   * POST /v1/auth/register
   * @summary Register a new user
   * @tags AUTH PUBLIC
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
   *       "__v": 0,
   *       "alarm": "Birds",
   *       "background": "#DFF7F2",
   *       "background_color": true,
   *       "techniques": []
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

  /**
   * POST /v1/auth/forgetpassword
   * @summary Request a password reset
   * @tags AUTH PUBLIC
   * @param {object} request.body.required - User details
   * @example request - Example of request body
   * {
   *  "email": "admin@admin.com"
   * }
   * @return {object} 201 - Mail sent and password reset
   * @return {object} 400 - Invalid data
   * @return {object} 500 - Internal server error
   * @example response - 201 - Example of response
   * {
   * "success": true,
   * "message": "Password reset email sent.",
   * "data": {
   *     "success": true,
   *     "message": "Password reset email sent. Check email.",
   *     "hashPassword": "{ password hashed }"
   *  }
   * }
   * @example response - 400 - Example of response
   * {
   *   "success": false,
   *   "message": "User not found."
   * }
   * @example response - 500 - Example of response
   * {
   *   "success": false,
   *   "message": "Internal server error."
   * }
   */
  .post('/auth/forgetpassword', Controller.forgetPassword)

// -- User protected routes --
export const userProtectedRoutes = express
  .Router()

  /**
   * GET /v1/users/getByToken
   * @summary Get Users by Token
   * @tags AUTH PRIVATE
   * @param {string} Authorization.header.required - Bearer token for authorization
   * @example request - Example of request body
   * {
   *  "Authorization" : "Bearer {Token}"
   * }
   * @return {object} 201 - User Found.
   * @return {object} 400 - User not Found.
   * @return {object} 500 - Internal server error
   * @example response - 201 - Example of response
   * {
    "success": true,
    "message": "User found.",
    "data": {
        "user": {
            "_id": "6716ce3799aaf188e7ed4d64",
            "email": "example@example.com",
            "name": "example",
            "surname": "example",
            "username": "Userexample",
            "password": "$2b$09$9sfrpFEhDFbKr.swTZctDugv4YhYogWi1/w3sYh4P4f0KuGMXDuX.",
            "role": "USER",
            "active": true,
            "createdAt": "2024-10-21T21:57:11.523Z",
            "updatedAt": "2024-10-21T21:58:30.863Z",
            "__v": 0,
            "alarm": "Birds",
            "background": "#DFF7F2",
            "background_color": true,
            "techniques": []
        }
    }
}
   * @example response - 400 - Example of response
   * {
   *   "success": false,
   *   "message": "User not found."
   * }
   * @example response - 500 - Example of response
   * {
   *   "success": false,
   *   "message": "Unauthorized"
   * }
   */
  .get('/users/getByToken', Controller.getByToken)

  /**
   * PUT /v1/users/update
   * @summary Update User
   * @tags AUTH PRIVATE
   * @param {string} Authorization.header.required - Bearer token for authorization
   * @param {object} request.body.required - User data to update
   * @example request - Example of request body
   * {
   *   "name": "Benjamin",
   *   "surname": "Peyraga",
   *   "username": "Ragepay",
   *   "password": "12345678",
   *   "email": "benjapey99@gmail.com",
   *   "role": "USER",
   *   "active": true
   * }
   * @example request - Example of request config
   * {
   *  "alarm": "Birds"
   * }
   * @return {object} 201 - User Updated.
   * @return {object} 400 - User not Found.
   * @return {object} 500 - Internal server error
   * @example response - 201 - Example of response
   * {
     "success": true,
     "message": "User updated.",
     "data": {
         "UserUpdate": {
             "_id": "671ff03616e415a0e1c5b5c4",
             "email": "benjapey99@gmail.com",
             "username": "Ragepay",
             "password": "$2b$09$CkNEyzhchIn4k1FMdZZu/OJd4teRI21B09WyMscmbYyvFEalzoZ2a",
             "role": "USER",
             "active": true,
             "createdAt": "2024-10-28T20:12:38.697Z",
             "updatedAt": "2024-10-28T20:15:19.297Z",
             "__v": 0,
             "name": "Benjamín",
             "surname": "Peyraga",
             "alarm": "Birds",
             "background": "#DFF7F2",
             "background_color": true,
             "techniques": []
         }
     }
  }
   * @example response - 400 - Example of response
   * {
   *   "success": false,
   *   "message": "User not updated."
   * }
   * @example response - 500 - Example of response
   * {
   *   "success": false,
   *   "message": "Unauthorized"
   * }
   */
  .put('/users/update', Controller.update)

  /**
   * DELETE /v1/users/delete
   * @summary Delete User
   * @tags AUTH PRIVATE
   * @param {string} Authorization.header.required - Bearer token for authorization
   * @example request - Example of request body
   * {
   *  "Authorization" : "Bearer {Token}"
   * }
   * @return {object} 201 - User Found.
   * @return {object} 400 - User not Found.
   * @return {object} 500 - Internal server error
   * @example response - 201 - Example of response
   * {
    "success": true,
    "message": "User deleted.",
    "data": {
        "userDeleted": {
            "_id": "671ff03616e415a0e1c5b5c4",
            "email": "benjapey99@gmail.com",
            "username": "Ragepay",
            "password": "$2b$09$CkNEyzhchIn4k1FMdZZu/OJd4teRI21B09WyMscmbYyvFEalzoZ2a",
            "role": "USER",
            "active": true,
            "createdAt": "2024-10-28T20:12:38.697Z",
            "updatedAt": "2024-10-28T20:15:19.297Z",
            "__v": 0,
            "name": "Benjamín",
            "surname": "Peyraga"
        }
    }
}
   * @example response - 400 - Example of response
   * {
   *   "success": false,
   *   "message": "User not deleted."
   * }
   * @example response - 500 - Example of response
   * {
   *   "success": false,
   *   "message": "Unauthorized"
   * }
   */
  .delete('/users/delete', Controller.delete)


// -- Admin protected routes --
export const adminProtectedRoutes = express
  .Router()
  .get('/users', Controller.get)
  .get('users/:id', Controller.get)
  .post('users/admin/register', Controller.register)
  .put('users/admin/update/:id', Controller.update)



