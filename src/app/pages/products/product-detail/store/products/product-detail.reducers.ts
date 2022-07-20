import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { clear, loadDetail, loadDetailFail, loadDetailSuccess, loadStock, loadStockFail, loadStockSuccess, removeStock, removeStockFail, removeStockSuccess, saveDetail, saveDetailFail, saveDetailSuccess, saveStock, saveStockFail, saveStockSuccess, uploadImage, uploadImageFail, uploadImageSuccess } from './product-detail.actions';
import { ProductDetailState } from './product-detail.state';

const initialState: ProductDetailState = AppInitialState.productDetail;

const _productDetailReducer = createReducer(initialState,
    on(loadDetail, (state) => {
        return {
            ...state,
            error: null,
            isLoaded: false,
            isLoading: true,
            product: undefined
        };
    }),
    on(loadDetailSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            product: action.product
        };
    }),
    on(loadDetailFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(saveDetail, (state) => {
        return {
            ...state,
            error: null,
            isSaved: false,
            isSaving: true
        };
    }),
    on(saveDetailSuccess, (state) => {
        return {
            ...state,
            isSaved: true,
            isSaving: false
        };
    }),
    on(saveDetailFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSaved: false,
            isSaving: false
        };
    }),
    on(clear, () => {
        return {
            ...initialState
        };
    }),
    on(loadStock, (state) => {
        return {
            ...state,
            error: null,
            isLoadedStock: false,
            isLoadingStock: true,
            isSavedStock: false,
            isSavingStock: false,
            stock: undefined
        };
    }),
    on(loadStockSuccess, (state, action) => {
        return {
            ...state,
            isLoadedStock: true,
            isLoadingStock: false,
            stock: action.stock
        };
    }),
    on(loadStockFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoadedStock: false,
            isLoadingStock: false
        };
    }),
    on(saveStock, (state) => {
        return {
            ...state,
            error: null,
            isSavedStock: false,
            isSavingStock: true
        };
    }),
    on(saveStockSuccess, (state) => {
        return {
            ...state,
            isSavedStock: true,
            isSavingStock: false
        };
    }),
    on(saveStockFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSavedStock: false,
            isSavingStock: false
        };
    }),
    on(uploadImage, (state) => {
        return {
            ...state,
            error: null,
            isUploadedImage: false,
            isUploadingImage: true
        };
    }),
    on(uploadImageSuccess, (state) => {
        return {
            ...state,
            isUploadedImage: true,
            isUploadingImage: false
        };
    }),
    on(uploadImageFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isUploadedImage: false,
            isUploadingImage: false
        };
    }),
    on(removeStock, (state) => {
        return {
            ...state,
            error: null,
            isRemovedStock: false,
            isRemovingStock: true
        };
    }),
    on(removeStockSuccess, (state) => {
        return {
            ...state,
            isRemovedStock: true,
            isRemovingStock: false
        };
    }),
    on(removeStockFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isRemovedStock: false,
            isRemovingStock: false
        };
    })
);
 
export function productDetailReducer(state: ProductDetailState, action: any) {
  return _productDetailReducer(state, action);
}