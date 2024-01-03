import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const TIMEOUT_VALUE = 1000;
    return next.handle().pipe(
      timeout(TIMEOUT_VALUE),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException(
                `It was too long. Method should be invoked within ${TIMEOUT_VALUE} ms`,
              ),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
