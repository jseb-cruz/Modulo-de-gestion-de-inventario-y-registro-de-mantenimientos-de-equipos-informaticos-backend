import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from
  '@nestjs/common';
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException
      ? exception.message
      : 'Unexpected error';
    res.status(status).json({
      ok: false,
      statusCode: status,
      path: (req as any).url,
      message,
    });
  }
}