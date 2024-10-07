import { type Request, type Response, type NextFunction } from 'express';

import ControllerHandler from '../handlers/controllers.handler';

import DTO from './dto';
import {
  register,
  login,
  update,
  get
} from './service';


export default class Controller {
  private constructor() { }

  // -- Register a new user --
  public static async register(req: Request, res: Response, next: NextFunction) {
    const { error, value } = DTO.register(req.body);
    if (error) return ControllerHandler.badRequest(error.message, res)
    try {
      const userData = await register(value);
      return ControllerHandler.created("User created.", userData, res)
    } catch (err) {
      next(err);
    }
  }

  // -- Login a user --
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { error, value } = DTO.login(req.body);
    if (error) return ControllerHandler.badRequest(error.message, res)
    try {
      const { userData, token } = await login(value);
      return ControllerHandler.ok("User logged in.", res, userData, token)
    } catch (err) {
      next(err);
    }
  }


  // -- Update user --
  public static async update(req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.id ? { id: req.params.id } : req.user;
    const { error, value } = DTO.update(req.body, user_id);
    if (error) return ControllerHandler.badRequest(error.message, res)
    try {
      const result = await update(value);
      if (result) return ControllerHandler.ok("User updated.", res)
      return ControllerHandler.notFound("User not updated.", res)
    } catch (err) {
      next(err);
    }
  }


  // -- Get user/s --
  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.params.id ? parseInt(req.params.id as string) : null;
      const users = await get(user_id);
      if (users) return ControllerHandler.ok("Users found.", res, users)
      return ControllerHandler.notFound("Users not found.", res)
    } catch (err) {
      next(err);
    }
  }

  // -- Get by token --
  public static async getByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = DTO.getByToken(req.user);
      if (error) return ControllerHandler.badRequest(error.message, res)
      const result = await get(value);
      if (result) return ControllerHandler.ok("User found.", res, result)
      return ControllerHandler.notFound("User not found.", res)
    } catch (err) {
      next(err);
    }
  }

}


