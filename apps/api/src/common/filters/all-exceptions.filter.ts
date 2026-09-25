import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse &&
            typeof exceptionResponse === 'object' &&
            'message' in exceptionResponse
          ? (exceptionResponse as { message: string | string[] }).message
          : 'Erro interno';

    if (status >= 500) {
      this.logger.error(
        {
          err:
            exception instanceof Error
              ? { name: exception.name, message: exception.message }
              : 'unknown',
          path: request.url,
          requestId: request.id,
        },
        'Unhandled error',
      );
    }

    void response.status(status).send({
      statusCode: status,
      error: HttpStatus[status] ?? 'Error',
      message,
      requestId: request.id,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
