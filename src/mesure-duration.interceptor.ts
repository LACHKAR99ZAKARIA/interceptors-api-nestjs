import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class MesureDurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startDate=Date.now();
    //console.log('intercepter: ',context);
    return next.handle().pipe(
      tap(valueFromRouteHandler => 
        console.log(`duration is : ${Date.now() - startDate}`),
        //console.log('after controler sending request',valueFromRouteHandler.toUpperCase())
        )
    );
  }
}
