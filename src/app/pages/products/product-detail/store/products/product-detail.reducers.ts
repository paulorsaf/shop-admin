import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadDetail, loadDetailFail, loadDetailSuccess } from './product-detail.actions';
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
);
 
export function productDetailReducer(state: ProductDetailState, action: any) {
  return _productDetailReducer(state, action);
}