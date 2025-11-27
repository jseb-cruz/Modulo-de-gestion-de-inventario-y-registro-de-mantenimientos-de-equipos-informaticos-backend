import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from
  '@nestjs/common';
import { map, Observable } from 'rxjs';
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Envuelve todas las respuestas en { ok, data }
    return next.handle().pipe(map(data => ({ ok: true, data })));
  }
}
