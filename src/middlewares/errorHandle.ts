import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ErrorMessages } from "../constants/errorMessages";
import { HttpStatus } from "../constants/httpStatus";

function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  console.error(error);
  if (error instanceof AppError) {
    const status = error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? ErrorMessages.INTERNAL_SERVER_ERROR
        : error.message;
    response.status(status).json({ status, message, detail: error.detail });
  } else {
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
  next();
}

export default errorMiddleware;
