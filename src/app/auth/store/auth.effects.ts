import { Actions, Effect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import * as AuthAction from './auth.action'
import { switchMap, map, catchError } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { of } from 'rxjs'

interface AuthResposeData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: number,
    localId: string,
    registered?: boolean
  }

  
@Injectable()

export class AuthEffects {
    
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthAction.LOGIN_START),
        switchMap((startLogin: AuthAction.Login_Start) => {
            debugger
            return this.http.post<AuthResposeData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
                + environment.firebase.apiKey,
                {
                    email: startLogin.payload.email, 
                    password: startLogin.payload.password, 
                    returnSecureToken: true
                }
            )
            .pipe(
                map(res => {
                    const expirationDate = new Date(
                        new Date().getTime() + +res.expiresIn *1000
                    );
                    return new AuthAction.Login({ 
                        email: res.email, 
                        localId: res.localId, 
                        idToken: res.idToken, 
                        expiresIn: expirationDate
                    });
                }),
                catchError((error: HttpErrorResponse) => {
                    return of();
                })
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}