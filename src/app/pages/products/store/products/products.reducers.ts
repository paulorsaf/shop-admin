import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadProducts, loadProductsFail, loadMoreProducts, loadProductsSuccess, removeProduct, removeProductFail, removeProductSuccess, updateProductOnList, updateProductOnListFail, updateProductOnListSuccess, filterProducts } from './products.actions';
import { ProductsState } from './products.state';

const initialState: ProductsState = AppInitialState.products;

const _productsReducer = createReducer(initialState,
    on(loadProducts, (state) => {
        return {
            ...state,
            error: null,
            filter: undefined,
            hasMoreToLoad: false,
            isFiltering: false,
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
            isFiltering: false,
            isLoadingMoreProducts: true,
            page: state.page + 1
        };
    }),
    on(loadProductsSuccess, (state, action) => {
        return {
            ...state,
            hasMoreToLoad: action.products?.length === 30 ? true : false,
            isFiltering: false,
            isLoaded: true,
            isLoading: false,
            isLoadingMoreProducts: false,
            products: state.page === 0 ? action.products : state.products.concat(action.products)
        };
    }),
    on(loadProductsFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false,
            isLoadingMoreProducts: false
        };
    }),
    on(filterProducts, (state, action) => {
        return {
            ...state,
            error: null,
            filter: action.filter,
            hasMoreToLoad: false,
            isFiltering: true,
            isLoaded: false,
            isLoading: false,
            isLoadingMoreProducts: false,
            page: 0,
            products: []
        };
    }),
    on(removeProduct, (state) => {
        return {
            ...state,
            error: null,
            isRemoved: false,
            isRemoving: true
        };
    }),
    on(removeProductSuccess, (state) => {
        return {
            ...state,
            isRemoved: true,
            isRemoving: false
        };
    }),
    on(removeProductFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isRemoved: false,
            isRemoving: false
        };
    }),
    on(updateProductOnList, (state, action) => {
        return {
            ...state,
            error: undefined,
            isLoadingProductDetail: true,
            productDetailId: action.id
        };
    }),
    on(updateProductOnListSuccess, (state, action) => {
        return {
            ...state,
            products: state.products
                .map(p => p.id === action.product.id ? action.product : p),
            isLoadingProductDetail: false,
            productDetailId: undefined
        };
    }),
    on(updateProductOnListFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoadingProductDetail: false,
            productDetailId: undefined
        };
    })
);
 
export function productsReducer(state: ProductsState, action: any) {
  return _productsReducer(state, action);
}