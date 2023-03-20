import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadPurchases, loadPurchasesFail, loadPurchasesSuccess, printPurchase, printPurchaseSuccess } from './purchases.actions';
import { PurchasesState } from './purchases.state';

const initialState: PurchasesState = AppInitialState.purchases;

const _purchasesReducer = createReducer(initialState,
    on(loadPurchases, (state) => {
        return {
            ...state,
            error: null,
            isLoaded: false,
            isLoading: true,
            purchases: []
        };
    }),
    on(loadPurchasesSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            purchases: action.purchases
        };
    }),
    on(loadPurchasesFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(printPurchase, (state) => {
        return {
            ...state,
            isPrinting: true
        };
    }),
    on(printPurchaseSuccess, (state) => {
        return {
            ...state,
            isPrinting: false
        };
    })
);
 
export function purchasesReducer(state: PurchasesState, action: any) {
  return _purchasesReducer(state, action);
}