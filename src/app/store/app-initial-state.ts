import { AppState } from "./app-state";

export const AppInitialState: AppState = {
    banners: {
        banners: [],
        error: null,
        isLoaded: false,
        isLoading: false,
        isRemoved: false,
        isRemoving: false
    },
    categories: {
        categories: [],
        error: null,
        isLoaded: false,
        isLoading: false,
        isRemoved: false,
        isRemoving: false
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
        isEditedStock: false,
        isEditingStock: false,
        isLoaded: false,
        isLoading: false,
        isLoadedStock: false,
        isLoadingStock: false,
        isRemovedImage: false,
        isRemovingImage: false,
        isRemovedStock: false,
        isRemovingStock: false,
        isSaved: false,
        isSaving: false,
        isSavedStock: false,
        isSavingStock: false,
        isUpdatedStock: false,
        isUpdatingStock: false,
        isUploadedImage: false,
        isUploadingImage: false,
        product: undefined,
        stock: undefined
    },
    products: {
        error: null,
        isLoaded: false,
        isLoading: false,
        isRemoved: false,
        isRemoving: false,
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