import { AppState } from "./app-state";

export const AppInitialState: AppState = {
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    },
    user: {
        isVerifiedUserLogged: false,
        isVerifyingUserLogged: false,
        user: null
    }
}