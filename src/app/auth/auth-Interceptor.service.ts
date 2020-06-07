import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap, retry } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Variables } from '../shared/variables';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        debugger
      return this.authService.newUser.pipe(
          take(1),
          exhaustMap(user => {

              if (!user) {
                console.log(req)
                return next.handle(req);
              }

              const modifiedReq = req.clone({
                  params: new HttpParams().set('auth', user.token)
              });
                console.log(modifiedReq)
              return next.handle(modifiedReq);
          })
      );
    }

}