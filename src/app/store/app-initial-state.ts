import { AppState } from "./app-state";

export const AppInitialState: AppState = {
    bannerDetail: {
        banner: undefined,
        error: null,
        isLoaded: false,
        isLoading: false,
        isSaved: false,
        isSaving: false
    },
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
    companyDetail: {
        company: undefined,
        error: undefined,
        isLoaded: false,
        isLoading: false,
        isSavedAddress: false,
        isSavingAddress: false,
        isSavedCompany: false,
        isSavingCompany: false
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
    purchaseDetail: {
        error: null,
        isLoaded: false,
        isLoading: false,
        isUpdated: false,
        isUpdating: false,
        purchase: undefined
    },
    purchases: {
        error: null,
        isLoaded: false,
        isLoading: false,
        purchases: []
    },
    user: {
        isLoggedOut: false,
        isLoggingOut: false,
        isVerifiedUserLogged: false,
        isVerifyingUserLogged: false,
        user: null
    }
}