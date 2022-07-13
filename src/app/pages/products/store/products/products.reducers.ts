import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { load, loadFail, loadSuccess, remove, removeFail, removeSuccess } from './products.actions';
import { ProductsState } from './products.state';

const initialState: ProductsState = AppInitialState.products;

const _productsReducer = createReducer(initialState,
    on(load, (state) => {
        return {
            ...state,
            error: null,
            isLoaded: false,
            isLoading: true,
            products: []
        };
    }),
    on(loadSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            products: action.products
        };
    }),
    on(loadFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(remove, (state) => {
        return {
            ...state,
            error: null,
            isRemoved: false,
            isRemoving: true
        };
    }),
    on(removeSuccess, (state) => {
        return {
            ...state,
            isRemoved: true,
            isRemoving: false
        };
    }),
    on(removeFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isRemoved: false,
            isRemoving: false
        };
    })
);
 
export function productsReducer(state: ProductsState, action: any) {
  return _productsReducer(state, action);
}