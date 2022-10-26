import { createReducer, on } from '@ngrx/store';
import { loadCompanyDetail, loadCompanyDetailSuccess } from 'src/app/pages/companies/company-detail/store/company-detail.actions';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadUserCompany, loadUserCompanyFail, loadUserCompanySuccess, logout, logoutSuccess, verfiyUserIsLogged, verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = AppInitialState.user;

const _userReducer = createReducer(initialState,
    on(verfiyUserIsLogged, (state) => {
        return {
            ...state,
            isVerifiedUserLogged: false,
            isVerifyingUserLogged: true,
            user: undefined
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
    }),
    on(logout, (state) => {
        return {
            ...state,
            isLoggedOut: false,
            isLoggingOut: true
        };
    }),
    on(logoutSuccess, (state) => {
        return {
            ...state,
            isLoggedOut: true,
            isLoggingOut: false
        };
    }),
    on(loadUserCompany, (state) => {
        return {
            ...state,
            company: undefined,
            error: undefined,
            isLoadedLoggedCompany: false,
            isLoadingLoggedCompany: true
        };
    }),
    on(loadUserCompanySuccess, (state, action) => {
        return {
            ...state,
            company: action.company,
            isLoadedLoggedCompany: true,
            isLoadingLoggedCompany: false
        };
    }),
    on(loadUserCompanyFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoadedLoggedCompany: false,
            isLoadingLoggedCompany: false
        };
    })
);
 
export function userReducer(state: UserState, action: any) {
  return _userReducer(state, action);
}