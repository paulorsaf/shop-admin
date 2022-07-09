import { AppInitialState } from "src/app/store/app-initial-state";
import { loadDetail, loadDetailFail, loadDetailSuccess } from "./product-detail.actions";
import { productDetailReducer } from "./product-detail.reducers";
import { ProductDetailState } from "./product-detail.state";

describe('Product store', () => {
    
    it('loadDetail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isLoaded: true,
            isLoading: false,
            product: {} as any
        };

        const state = productDetailReducer(initialState, loadDetail({id: '1'}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isLoaded: false,
            isLoading: true,
            product: undefined
        });
    });
    
    it('loadDetailSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isLoaded: false,
            isLoading: true
        };

        const product = {id: 1} as any;
        const state = productDetailReducer(initialState, loadDetailSuccess({product}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isLoaded: true,
            isLoading: false,
            product
        });
    });
    
    it('loadDetailFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isLoaded: false,
            isLoading: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, loadDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
  
});