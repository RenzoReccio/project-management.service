import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomResponse } from 'src/presentation/dtos/response.model';

@Catch(Error)
export class GlobalExceptionHandler implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let errors = [exception.message];
    console.log(errors)
    let customResponse = new CustomResponse<string>('', '', errors);

    response
      .status(statusCode)
      .json(customResponse);
  }
}