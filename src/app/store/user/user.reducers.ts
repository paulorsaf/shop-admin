import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { verfiyUserIsLogged, verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = AppInitialState.user;

const _userReducer = createReducer(initialState,
    on(verfiyUserIsLogged, (state) => {
        return {
            ...state,
            isVerifiedUserLogged: false,
            isVerifyingUserLogged: true,
            user: null
        };
    }),
    on(verfiyUserIsLoggedSuccess, (state, action) => {
        return {
            ...state,
            isVerifiedUserLogged: true,
            isVerifyingUserLogged: false,
            user: action.user
        };
    }),
    on(verfiyUserIsLoggedFail, (state) => {
        return {
            ...state,
            isVerifiedUserLogged: true,
            isVerifyingUserLogged: false
        };
    })
);
 
export function userReducer(state: UserState, action: any) {
  return _userReducer(state, action);
}