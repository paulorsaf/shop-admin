import { AppInitialState } from "src/app/store/app-initial-state";
import { clear, loadDetail, loadDetailFail, loadDetailSuccess, loadStock, loadStockFail, loadStockSuccess, saveDetail, saveDetailFail, saveDetailSuccess, saveStock, saveStockFail, saveStockSuccess } from "./product-detail.actions";
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
    
    it('loadStock', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isLoadedStock: true,
            isLoadingStock: false,
            isSavedStock: true,
            isSavingStock: true,
            stock: [{}] as any
        };

        const state = productDetailReducer(initialState, loadStock({id: '1'}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isLoadedStock: false,
            isLoadingStock: true,
            isSavedStock: false,
            isSavingStock: false,
            stock: []
        });
    });
    
    it('loadStockSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isLoadingStock: true
        };

        const stock = [{}, {}] as any;
        const state = productDetailReducer(initialState, loadStockSuccess({stock}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isLoadedStock: true,
            isLoadingStock: false,
            stock
        });
    });
    
    it('loadStockFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isLoadingStock: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, loadStockFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isLoadedStock: false,
            isLoadingStock: false
        });
    });
    
    it('saveStock', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isSavedStock: true,
            isSavingStock: false
        };

        const stock = {id: 1} as any;
        const state = productDetailReducer(initialState, saveStock({stock}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isSavedStock: false,
            isSavingStock: true,
        });
    });
    
    it('saveStockSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isSavingStock: true
        };

        const state = productDetailReducer(initialState, saveStockSuccess());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isSavedStock: true,
            isSavingStock: false,
        });
    });
    
    it('saveStockFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isSavingStock: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, saveStockFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isSavedStock: false,
            isSavingStock: false
        });
    });
  
});