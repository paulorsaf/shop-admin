import { categoryDetailInitialState } from "../pages/categories/category-detail/store/category-detail.state";
import { categoriesInitialState } from "../pages/categories/store/categories.state";
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
    categories: categoriesInitialState,
    categoryDetail: categoryDetailInitialState,
    clients: {
        error: null,
        isLoaded: false,
        isLoading: false,
        clients: []
    },
    companyDetail: {
        address: undefined,
        company: undefined,
        error: undefined,
        isLoaded: false,
        isLoading: false,
        isLoadedAddress: false,
        isLoadingAddress: false,
        isSavedAboutUs: false,
        isSavingAboutUs: false,
        isSavedAddress: false,
        isSavingAddress: false,
        isSavedCompany: false,
        isSavingCompany: false,
        isSavedDeliveryPrice: false,
        isSavingDeliveryPrice: false,
        isSavedPayment: false,
        isSavingPayment: false,
        isSavedServiceTax: false,
        isSavingServiceTax: false,
        isUploadedLogo: false,
        isUploadingLogo: false
    },
    cupoms: {
        cupoms: [],
        error: null,
        isLoaded: false,
        isLoading: false,
        isSaved: false,
        isSaving: false,
    },
    dailyPurchaseSummaries: {
        dailyPurchaseSummaries: [],
        error: null,
        isLoaded: false,
        isLoading: false
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
        isChangingVisibility: false,
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
        filter: undefined,
        hasMoreToLoad: false,
        isFiltering: false,
        isLoaded: false,
        isLoading: false,
        isLoadingMoreProducts: false,
        isLoadingProductDetail: false,
        isRemoved: false,
        isRemoving: false,
        isUploading: false,
        page: 0,
        products: []
    },
    purchaseDetail: {
        error: null,
        isCanceledProduct: false,
        isCancelingProduct: false,
        isEditedProduct: false,
        isEditingProduct: false,
        isLoaded: false,
        isLoading: false,
        isSendingToSystem: false,
        isSentToSystem: false,
        isUpdated: false,
        isUpdating: false,
        purchase: undefined
    },
    purchases: {
        error: null,
        isLoaded: false,
        isLoading: false,
        isPrinting: false,
        isPrintingAll: false,
        purchases: []
    },
    updateStock: {
        error: undefined,
        isUpdated: false,
        isUpdating: false
    },
    user: {
        company: undefined,
        error: undefined,
        isLoadedLoggedCompany: false,
        isLoadingLoggedCompany: false,
        isLoggedOut: false,
        isLoggingOut: false,
        isVerifiedUserLogged: false,
        isVerifyingUserLogged: false,
        user: undefined
    }
}