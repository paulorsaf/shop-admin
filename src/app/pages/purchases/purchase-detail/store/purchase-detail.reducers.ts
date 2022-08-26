import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess } from './purchase-detail.actions';
import { PurchaseDetailState } from './purchase-detail.state';

const initialState: PurchaseDetailState = AppInitialState.purchaseDetail;

const _purchaseDetailReducer = createReducer(initialState,
    on(loadPurchaseDetail, (state) => {
        return {
            ...state,
            error: null,
            isLoaded: false,
            isLoading: true,
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
    })
);
 
export function purchaseDetailReducer(state: PurchaseDetailState, action: any) {
  return _purchaseDetailReducer(state, action);
}