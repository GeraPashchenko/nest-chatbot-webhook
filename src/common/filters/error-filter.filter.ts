import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let exceptionError;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const error = exception.getResponse();

    if (Object.keys(error).includes('errors')) {
      exceptionError = exception.getResponse() as {
        errors: [
          {
            messageKey: string;
            property: string;
          },
        ];
      };
      exceptionError = exceptionError.errors;
    } else {
      exceptionError = exception.getResponse() as {
        message: string;
        error: string;
        statusCode: number;
        property?: string;
      };

      exceptionError = [
        {
          messageKey: exceptionError.message,
          ...(exceptionError.property
            ? { property: exceptionError.property }
            : {}),
        },
      ];
    }

    response.status(status).json({
      errors: exceptionError,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
