import { User } from "src/app/model/user/user";
import { AppInitialState } from "src/app/store/app-initial-state";
import { verfiyUserIsLogged, verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from "./user.actions";
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
            user: null
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

});