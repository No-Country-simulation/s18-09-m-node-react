import express from 'express';

import Controller from './controller.js';

// -- Not protected routes --
export const notProtectedRoutes = express
  .Router()
  .post('/auth/login', Controller.login)
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



