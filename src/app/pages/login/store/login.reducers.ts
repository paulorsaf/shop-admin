import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.actions';
import { LoginState } from './login.state';

const initialState: LoginState = AppInitialState.login;

const _loginReducer = createReducer(initialState,
    on(login, (state) => {
        return {
            ...state,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };
    }),
    on(loginSuccess, (state) => {
        return {
            ...state,
            isLoggedIn: true,
            isLoggingIn: false
        };
    }),
    on(loginFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false
        };
    }),
    on(recoverPassword, (state) => {
        return {
            ...state,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        };
    }),
    on(recoverPasswordSuccess, (state) => {
        return {
            ...state,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        };
    }),
    on(recoverPasswordFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };
    })
);
 
export function loginReducer(state: LoginState, action: any) {
  return _loginReducer(state, action);
}