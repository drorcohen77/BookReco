import { Action } from '@ngrx/store';

export const LOGIN_START = '[auth] LOGIN_START';
export const LOGIN = '[auth] LOGIN';
export const LOGOUT = '[auth] LOGOUT';


export class Login_Start implements Action{
    readonly type = LOGIN_START;

    constructor(public payload: { email: string, password: string }) {debugger}
}

export class Login implements Action {
    readonly type = LOGIN;

    constructor(
        public payload: {
            email: string, 
            localId: string, 
            idToken: string, 
            expiresIn: Date
        }
    ){debugger}
}


export class Logout implements Action {
    readonly type = LOGOUT;
}


export type AuthAction = Login_Start | Login | Logout;

