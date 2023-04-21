import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { load, loadFail, loadMoreProducts, loadSuccess, remove, removeFail, removeSuccess } from './products.actions';
import { ProductsState } from './products.state';

const initialState: ProductsState = AppInitialState.products;

const _productsReducer = createReducer(initialState,
    on(load, (state) => {
        return {
            ...state,
            error: null,
            hasMoreToLoad: false,
            isLoaded: false,
            isLoading: true,
            isLoadingMoreProducts: false,
            page: 0,
            products: []
        };
    }),
    on(loadMoreProducts, (state) => {
        return {
            ...state,
            isLoadingMoreProducts: true,
            page: state.page + 1
        };
    }),
    on(loadSuccess, (state, action) => {
        return {
            ...state,
            hasMoreToLoad: action.products?.length === 30 ? true : false,
            isLoaded: true,
            isLoading: false,
            isLoadingMoreProducts: false,
            products: state.page === 0 ? action.products : state.products.concat(action.products)
        };
    }),
    on(loadFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false,
            isLoadingMoreProducts: false
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