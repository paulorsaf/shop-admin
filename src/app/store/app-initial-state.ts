import { AppState } from "./app-state";

export const AppInitialState: AppState = {
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    },
    products: {
        error: null,
        isLoaded: false,
        isLoading: false,
        products: []  
    },
    user: {
        isLoggedOut: false,
        isLoggingOut: false,
        isVerifiedUserLogged: false,
        isVerifyingUserLogged: false,
        user: null
    }
}