import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { changeVisibility, changeVisibilityFail, changeVisibilitySuccess, clear, loadDetail, loadDetailFail, loadDetailSuccess, loadStock, loadStockFail, loadStockSuccess, removeImage, removeImageFail, removeImageSuccess, removeStock, removeStockFail, removeStockSuccess, resetFlags, saveDetail, saveDetailFail, saveDetailSuccess, saveStockOption, saveStockOptionFail, saveStockOptionSuccess, updateStockOption, updateStockOptionFail, updateStockOptionSuccess, uploadImage, uploadImageFail, uploadImageSuccess } from './product-detail.actions';
import { ProductDetailState } from './product-detail.state';

const initialState: ProductDetailState = AppInitialState.productDetail;

const _productDetailReducer = createReducer(initialState,
    on(loadDetail, (state) => {
        return {
            ...state,
            error: null,
            isChangingVisibility: false,
            isLoaded: false,
            isLoading: true,
            product: undefined,
            productChangingVisibilityId: undefined
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
    on(saveStockOption, (state) => {
        return {
            ...state,
            error: null,
            isSavedStock: false,
            isSavingStock: true
        };
    }),
    on(saveStockOptionSuccess, (state) => {
        return {
            ...state,
            isSavedStock: true,
            isSavingStock: false
        };
    }),
    on(saveStockOptionFail, (state, action) => {
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
    }),
    on(updateStockOption, (state) => {
        return {
            ...state,
            error: null,
            isUpdatedStock: false,
            isUpdatingStock: true
        };
    }),
    on(updateStockOptionSuccess, (state) => {
        return {
            ...state,
            isUpdatedStock: true,
            isUpdatingStock: false
        };
    }),
    on(updateStockOptionFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isUpdatedStock: false,
            isUpdatingStock: false
        };
    }),
    on(resetFlags, state => {
        return {
            ...state,
            isEditedStock: false,
            isEditingStock: false,
            isRemovedStock: false,
            isRemovingStock: false,
            isSavedStock: false,
            isSavingStock: false,
            isUpdatedStock: false,
            isUpdatingStock: false
        };
    }),
    on(removeImage, (state) => {
        return {
            ...state,
            error: null,
            isRemovedImage: false,
            isRemovingImage: true
        };
    }),
    on(removeImageSuccess, (state) => {
        return {
            ...state,
            isRemovedImage: true,
            isRemovingImage: false
        };
    }),
    on(removeImageFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isRemovedImage: false,
            isRemovingImage: false
        };
    }),
    on(changeVisibility, (state, action) => {
        return {
            ...state,
            error: null,
            isChangingVisibility: true,
            productChangingVisibilityId: action.id
        };
    }),
    on(changeVisibilitySuccess, (state) => {
        return {
            ...state,
            isChangingVisibility: false,
            productChangingVisibilityId: undefined
        };
    }),
    on(changeVisibilityFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isChangingVisibility: false,
            productChangingVisibilityId: undefined
        };
    })
);
 
export function productDetailReducer(state: ProductDetailState, action: any) {
  return _productDetailReducer(state, action);
}