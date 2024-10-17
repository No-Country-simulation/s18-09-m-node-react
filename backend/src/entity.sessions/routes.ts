import express from 'express';
import Controller from './controller';

export const notProtectedRoutes = express.Router();
export const userProtectedRoutes = express.Router();

userProtectedRoutes.get('/sessions', Controller.get);
userProtectedRoutes.post('/sessions/register', Controller.register);

export const adminProtectedRoutes = express.Router();

adminProtectedRoutes.put('/sessions/update/:id', Controller.update);
