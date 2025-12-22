import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalResponseInterceptor<T = unknown> implements NestInterceptor<T, { status: string; data: T }> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<{ status: string; data: T }> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data,
      })),
    );
  }
}