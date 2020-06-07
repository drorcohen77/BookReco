import { User } from '../user.model';
import * as AuthAction from './auth.action';


export interface State {
    user: User;
}

const initialState: State = {
    user: null
};

export function AuthReducer(state = initialState , action: AuthAction.AuthAction) {
    
    switch (action.type) {
        case AuthAction.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.idToken,
                action.payload.localId,
                action.payload.expiresIn
            );
            return {
                ...state,
                user // can be written also as "user: user"
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}