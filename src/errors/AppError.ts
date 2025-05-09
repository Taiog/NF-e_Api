import { HttpStatus } from "../constants/httpStatus";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly detail: Record<string, any> | null;

  constructor(
    message: string,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    detail: Record<string, any>,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.detail = detail;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Requisição inválida", detail = {}) {
    super(message, HttpStatus.BAD_REQUEST, detail);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado", detail = {}) {
    super(message, HttpStatus.NOT_FOUND, detail);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Erro interno", detail = {}) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, detail);
  }
}
