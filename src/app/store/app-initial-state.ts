import { AppState } from "./app-state";

export const AppInitialState: AppState = {
    categories: {
        categories: [],
        error: null,
        isLoaded: false,
        isLoading: false
    },
    categoryDetail: {
        error: null,
        isLoaded: false,
        isLoading: false,
        isSaved: false,
        isSaving: false,
        category: undefined
    },
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    },
    productDetail: {
        error: null,
        isLoaded: false,
        isLoading: false,
        product: undefined
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