import { Request, Response, NextFunction } from "express";

import HTTP_STATUS from '../constants/httpStatusCodes';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  console.log(error.stack)

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Internal server error.",
    error: error.errors?.map((e: any) => e.message).join(", ") ?? error.name ?? "InternalServerError"
  });
}
