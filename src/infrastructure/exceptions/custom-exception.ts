import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class InternalServerException extends HttpException {
  constructor(message: string = 'Internal Server Error' , status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message , status);
  }
}

export class ValidationException extends HttpException {
  constructor(message: string = 'Internal Server Error', statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(JSON.stringify(message) , statusCode);
  }
}

export function handleError(res: Response, error) {
  return res.status(error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message ?? 'Internal Server Error' });
}