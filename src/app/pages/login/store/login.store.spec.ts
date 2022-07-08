import { AppInitialState } from "src/app/store/app-initial-state";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducers";

describe('Login store', () => {
    
    it('login', () => {
        const initialState = {
            ...AppInitialState.login,
            error: {id: 1},
            isLoggedIn: true,
            isLoggingIn: false,
            isRecoveredPassword: true,
            isRecoveringPassword: true
        };

        const state = loginReducer(initialState, login({email: "", password: ""}));

        expect(state).toEqual({
            ...AppInitialState.login,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        });
    });
    
    it('loginSuccess', () => {
        const initialState = {
            ...AppInitialState.login,
            isLoggingIn: true
        };
        
        const user = {id: 1} as any;
        const state = loginReducer(initialState, loginSuccess({user}));

        expect(state).toEqual({
            ...AppInitialState.login,
            isLoggedIn: true,
            isLoggingIn: false
        });
    });
    
    it('loginFail', () => {
        const initialState = {
            ...AppInitialState.login,
            isLoggingIn: true
        };
        
        const error = {error: 'error'};
        const state = loginReducer(initialState, loginFail({error}));

        expect(state).toEqual({
            ...AppInitialState.login,
            error,
            isLoggedIn: false,
            isLoggingIn: false
        });
    });
    
    it('recoverPassword', () => {
        const initialState = {
            ...AppInitialState.login,
            error: {id: 1},
            isRecoveredPassword: true,
            isRecoveringPassword: false
        };

        const state = loginReducer(initialState, recoverPassword({email: ""}));

        expect(state).toEqual({
            ...AppInitialState.login,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        });
    });
    
    it('recoverPasswordSuccess', () => {
        const initialState = {
            ...AppInitialState.login,
            isRecoveringPassword: true
        };

        const state = loginReducer(initialState, recoverPasswordSuccess());

        expect(state).toEqual({
            ...AppInitialState.login,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        });
    });
    
    it('recoverPasswordFail', () => {
        const initialState = {
            ...AppInitialState.login,
            isRecoveringPassword: true
        };

        const error = {error: 'error'};
        const state = loginReducer(initialState, recoverPasswordFail({error}));

        expect(state).toEqual({
            ...AppInitialState.login,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        });
    });
  
});