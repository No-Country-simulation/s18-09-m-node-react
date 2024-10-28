import { type Request, type Response, type NextFunction } from 'express';

import ControllerHandler from '../handlers/controllers.handler';

import DTO from './dto';
import { register, update, get, getById } from './service';

export default class Controller {
  private constructor() { }

  // -- Register a new technique --
  public static async register(req: Request, res: Response, next: NextFunction) {
    const { error, value } = DTO.register(req.body, req.user);
    if (error) return ControllerHandler.badRequest(error.message, res);
    try {
      const techniqueData = await register(value);
      return ControllerHandler.created('Technique created.', techniqueData, res);
    } catch (err) {
      next(err);
    }
  }

  // -- Update technique --
  public static async update(req: Request, res: Response, next: NextFunction) {
    const technique_id = req.params.id as string;
    const { error, value } = DTO.update(req.body, technique_id);
    if (error) return ControllerHandler.badRequest(error.message, res);
    try {
      const result = await update(value);
      if (result) return ControllerHandler.ok('Technique updated.', res);
      return ControllerHandler.notFound('Technique not updated.', res);
    } catch (err) {
      next(err);
    }
  }

  // -- Get techniques --
  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.user as any
      const techniques = await get(user_id?._id as string);
      if (techniques.length > 0) return ControllerHandler.ok('Techniques found.', res, techniques);
      return ControllerHandler.notFound('Techniques not found.', res);
    } catch (err) {
      next(err);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const technique_id = req.params.id as string;
      const technique = await getById(technique_id);
      if (technique) return ControllerHandler.ok('Technique found.', res, technique);
      return ControllerHandler.notFound('Techniques not found.', res);
    } catch (err) {
      next(err);
    }
  }
}
