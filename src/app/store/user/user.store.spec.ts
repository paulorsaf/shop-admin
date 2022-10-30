import { User } from "src/app/model/user/user";
import { AppInitialState } from "src/app/store/app-initial-state";
import { loadUserCompany, loadUserCompanyFail, loadUserCompanySuccess, logout, logoutSuccess, verfiyUserIsLogged, verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from "./user.actions";
import { userReducer } from "./user.reducers";
import { UserState } from "./user.state";

describe('User store', () => {
    
    it('verfiyUserIsLogged', () => {
        const initialState: UserState = {
            ...AppInitialState.user,
            isVerifiedUserLogged: true,
            isVerifyingUserLogged: false,
            user: {id: 1} as any
        };

        const state = userReducer(initialState, verfiyUserIsLogged());

        expect(state).toEqual({
            ...AppInitialState.user,
            isVerifiedUserLogged: false,
            isVerifyingUserLogged: true,
            user: undefined
        });
    });
    
    it('verfiyUserIsLoggedSuccess', () => {
        const initialState: UserState = {
            ...AppInitialState.user,
            isVerifiedUserLogged: false,
            isVerifyingUserLogged: true
        };

        const user = {id: 1} as any;
        const state = userReducer(initialState, verfiyUserIsLoggedSuccess({user}));

        expect(state).toEqual({
            ...AppInitialState.user,
            isVerifiedUserLogged: true,
            isVerifyingUserLogged: false,
            user
        });
    });
    
    it('verfiyUserIsLoggedFail', () => {
        const initialState: UserState = {
            ...AppInitialState.user,
            isVerifiedUserLogged: false,
            isVerifyingUserLogged: true
        };

        const state = userReducer(initialState, verfiyUserIsLoggedFail());

        expect(state).toEqual({
            ...AppInitialState.user,
            isVerifiedUserLogged: true,
            isVerifyingUserLogged: false
        });
    });
    
    it('logout', () => {
        const initialState: UserState = {
            ...AppInitialState.user,
            isLoggedOut: true,
            isLoggingOut: false
        };

        const state = userReducer(initialState, logout());

        expect(state).toEqual({
            ...AppInitialState.user,
            isLoggedOut: false,
            isLoggingOut: true
        });
    });
    
    it('logoutSuccess', () => {
        const initialState: UserState = {
            ...AppInitialState.user,
            isLoggedOut: false,
            isLoggingOut: true
        };

        const state = userReducer(initialState, logoutSuccess());

        expect(state).toEqual({
            ...AppInitialState.user,
            isLoggedOut: true,
            isLoggingOut: false
        });
    });
    
    it('loadUserCompany', () => {
        const initialState: UserState = {
            ...AppInitialState.user,
            company: {} as any,
            error: {} as any,
            isLoadedLoggedCompany: true,
            isLoadingLoggedCompany: false
        };

        const state = userReducer(initialState, loadUserCompany());

        expect(state).toEqual({
            ...AppInitialState.user,
            company: undefined,
            error: undefined,
            isLoadedLoggedCompany: false,
            isLoadingLoggedCompany: true
        });
    });
    
    it('loadUserCompanySuccess', () => {
        const initialState: UserState = {
            ...AppInitialState.user,
            isLoadingLoggedCompany: true
        };

        const company = {id: "anyCompanyId"} as any
        const state = userReducer(initialState, loadUserCompanySuccess({company}));

        expect(state).toEqual({
            ...AppInitialState.user,
            company,
            isLoadedLoggedCompany: true,
            isLoadingLoggedCompany: false
        });
    });
    
    it('loadUserCompanyFail', () => {
        const initialState: UserState = {
            ...AppInitialState.user,
            isLoadingLoggedCompany: true
        };

        const error = {error: "error"} as any
        const state = userReducer(initialState, loadUserCompanyFail({error}));

        expect(state).toEqual({
            ...AppInitialState.user,
            error,
            isLoadedLoggedCompany: false,
            isLoadingLoggedCompany: false
        });
    });

});