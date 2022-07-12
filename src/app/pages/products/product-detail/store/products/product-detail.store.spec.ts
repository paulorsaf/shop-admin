import { AppInitialState } from "src/app/store/app-initial-state";
import { clear, loadDetail, loadDetailFail, loadDetailSuccess, saveDetail, saveDetailFail, saveDetailSuccess } from "./product-detail.actions";
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
    
    it('saveDetail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isSaved: true,
            isSaving: false
        };

        const product = {id: 1} as any;
        const state = productDetailReducer(initialState, saveDetail({product}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isSaved: false,
            isSaving: true
        });
    });
    
    it('saveDetailSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isSaved: false,
            isSaving: true
        };

        const state = productDetailReducer(initialState, saveDetailSuccess());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isSaved: true,
            isSaving: false
        });
    });
    
    it('saveDetailFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isSaved: false,
            isSaving: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, saveDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isSaved: false,
            isSaving: false
        });
    });
    
    it('clear', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isLoaded: true,
            isLoading: true,
            isSaved: true,
            isSaving: true,
            product: {} as any
        };

        const state = productDetailReducer(initialState, clear());

        expect(state).toEqual({
            ...AppInitialState.productDetail
        });
    });
  
});