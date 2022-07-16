import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FilterRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request= context.switchToHttp().getRequest();
    if(request.params.name.toLowerCase() === 'duck'){
      request.params.name='d***';
      //throw new ForbiddenException();
    }else{
      next.handle();
    }
    return next.handle();
  }
}
