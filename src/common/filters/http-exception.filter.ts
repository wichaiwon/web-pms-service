import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null && 'message' in res) {
        message = (res as any).message;
      } else {
        message = res as string;
      }
    } else if (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception
    ) {
      // Database errors
      if (exception['code'] === '23502' &&
        'driverError' in exception &&
        typeof exception['driverError'] === 'object' &&
        exception['driverError'] !== null
      ) {
        // Postgres NOT NULL violation
        if ('column' in exception['driverError']) {
          message = `Field '${exception['driverError']['column']}' is required.`;
        } else {
          message = 'Required field is missing.';
        }
      } else if (exception['code'] === '23505' && 'detail' in exception) {
        // Postgres UNIQUE constraint violation
        const detail = exception['detail'] as string;
        // Extract field name from detail: "Key (field_name)=(value) already exists."
        const match = detail.match(/Key \(([^)]+)\)=/);
        if (match) {
          message = `${match[1]} already exists.`;
        } else {
          message = 'Duplicate entry found.';
        }
      }
    } else if (
      typeof exception === 'object' &&
      exception !== null &&
      'message' in exception &&
      typeof exception['message'] === 'string'
    ) {
      // Generic error with message
      message = exception['message'];
    }

    response.status(status).json({
      status: 'error',
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}