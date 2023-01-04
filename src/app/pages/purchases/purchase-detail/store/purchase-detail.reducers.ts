import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { cancelPurchaseProduct, cancelPurchaseProductFail, cancelPurchaseProductSuccess, editPurchaseProduct, editPurchaseProductFail, editPurchaseProductSuccess, loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess, sendPurchaseToSystem, sendPurchaseToSystemFail, sendPurchaseToSystemSuccess, updatePurchaseStatus, updatePurchaseStatusFail, updatePurchaseStatusSuccess } from './purchase-detail.actions';
import { PurchaseDetailState } from './purchase-detail.state';

const initialState: PurchaseDetailState = AppInitialState.purchaseDetail;

const _purchaseDetailReducer = createReducer(initialState,
    on(loadPurchaseDetail, (state) => {
        return {
            ...state,
            error: null,
            isCanceledProduct: false,
            isCancelingProduct: false,
            isEditedProduct: false,
            isEditingProduct: false,
            isLoaded: false,
            isLoading: true,
            isSendingToSystem: false,
            isSentToSystem: false,
            isUpdated: false,
            isUpdating: false,
            purchase: undefined
        };
    }),
    on(loadPurchaseDetailSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            purchase: action.purchase
        };
    }),
    on(loadPurchaseDetailFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(updatePurchaseStatus, (state) => {
        return {
            ...state,
            error: null,
            isUpdated: false,
            isUpdating: true
        };
    }),
    on(updatePurchaseStatusSuccess, (state) => {
        return {
            ...state,
            isUpdated: true,
            isUpdating: false
        };
    }),
    on(updatePurchaseStatusFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isUpdated: false,
            isUpdating: false
        };
    }),
    on(sendPurchaseToSystem, (state) => {
        return {
            ...state,
            error: null,
            isSendingToSystem: true,
            isSentToSystem: false
        };
    }),
    on(sendPurchaseToSystemSuccess, (state) => {
        return {
            ...state,
            isSendingToSystem: false,
            isSentToSystem: true
        };
    }),
    on(sendPurchaseToSystemFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSendingToSystem: false,
            isSentToSystem: false
        };
    }),
    on(editPurchaseProduct, (state) => {
        return {
            ...state,
            error: null,
            isEditedProduct: false,
            isEditingProduct: true
        };
    }),
    on(editPurchaseProductSuccess, (state) => {
        return {
            ...state,
            isEditedProduct: true,
            isEditingProduct: false
        };
    }),
    on(editPurchaseProductFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isEditedProduct: false,
            isEditingProduct: false
        };
    }),
    on(cancelPurchaseProduct, (state) => {
        return {
            ...state,
            error: null,
            isCanceledProduct: false,
            isCancelingProduct: true
        };
    }),
    on(cancelPurchaseProductSuccess, (state) => {
        return {
            ...state,
            isCanceledProduct: true,
            isCancelingProduct: false
        };
    }),
    on(cancelPurchaseProductFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isCanceledProduct: false,
            isCancelingProduct: false
        };
    })
);
 
export function purchaseDetailReducer(state: PurchaseDetailState, action: any) {
  return _purchaseDetailReducer(state, action);
}