import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';


interface AuthResposeData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: number,
  localId: string,
  registered?: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  public newUser = new BehaviorSubject<User>(null)
  public logedIn: boolean = false;
  public fromRegister: boolean = false;

  constructor(private http: HttpClient) {}

  public singup(email: string, password: string, userName: string) {
    
    return this.http.post<AuthResposeData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZbC9_a1JhJYIoMkVTSFk2HGsEJFWYaWk', 
      {
        email: email, 
        password: password, 
        returnSecureToken: true,
        userName: userName
      }
    )
    .pipe(
      tap(success => {
        this.handleAuth(
          success.email,
          success.localId,
          success.idToken,
          +success.expiresIn
        );
      }),
      catchError(this.handleError)
    );
  }


  public logIn(email: string, password: string) {
    
    return this.http.post<AuthResposeData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZbC9_a1JhJYIoMkVTSFk2HGsEJFWYaWk',
      {
        email: email, 
        password: password, 
        returnSecureToken: true
      }
    )
    .pipe(
      tap(res => {
        this.handleAuth(
          res.email,
          res.localId,
          res.idToken,
          +res.expiresIn
        );
      }),
      catchError(this.handleError)
    );
  }


  private handleAuth(email: string, userID: string, token: string, expiresIn: number) {
    const expiration = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userID, token, expiration);

    this.newUser.next(user);
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid';
        break;
    }
    return throwError(errorMessage);
  }

}
