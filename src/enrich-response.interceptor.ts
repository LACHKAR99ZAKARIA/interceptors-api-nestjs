import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class EnrichResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const timeZoneOffset = `${now.getTimezoneOffset}/60`;
    const result = { headers: null, datelogged: now.toISOString(), timezoneoffset: timeZoneOffset };
    result.headers = context.getArgs().values().next().value.headers;
    return next.handle().pipe(
      map(valueFromRoute => {
        //return (valueFromRoute as string).toLocaleUpperCase();
        /*return {initialContent: valueFromRoute, 
          editContent:(valueFromRoute as string).toLocaleUpperCase(),
          length:(valueFromRoute as string).length,
        } */
        return { 
          initialcontent: valueFromRoute,
           length: valueFromRoute.length,
            result,
          };
      })
    );
  }
}
