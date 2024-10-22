import { type Request, type Response, type NextFunction } from 'express';
import ControllerHandler from '../handlers/controllers.handler';
import DTO from './dto';
import { get, register, update } from './service';

export default class Controller {
  private constructor() {}

  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await get();
      if (sessions.length > 0) return ControllerHandler.ok('Sessions found.', res, sessions);
      return ControllerHandler.notFound('Sessions not found.', res);
    } catch (err) {
      next(err);
    }
  }

  public static async register(req: Request, res: Response, next: NextFunction) {
    const { error, value } = await  DTO.register(req.body);
    if (error) return ControllerHandler.badRequest(error.message, res);
    try {
      const userData = await register(value);
      return ControllerHandler.created('Session created.', userData, res);
    } catch (err) {
      next(err);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    const session_id = req.params.id as string;
    const { error, value } = DTO.update(req.body, session_id);
    if (error) return ControllerHandler.badRequest(error.message, res);
    try {
      const result = await update(value);
      if (result) return ControllerHandler.ok('Session updated.', res);
      return ControllerHandler.notFound('Session not updated.', res);
    } catch (err) {
      next(err);
    }
  }
}
