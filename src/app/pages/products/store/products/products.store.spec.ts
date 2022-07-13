import { AppInitialState } from "src/app/store/app-initial-state";
import { load, loadFail, loadSuccess, remove, removeFail, removeSuccess } from "./products.actions";
import { productsReducer } from "./products.reducers";
import { ProductsState } from "./products.state";

describe('Products store', () => {
    
    it('load', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            error: {},
            isLoaded: true,
            isLoading: false,
            products: [{}] as any
        };

        const state = productsReducer(initialState, load());

        expect(state).toEqual({
            ...AppInitialState.products,
            error: null,
            isLoaded: false,
            isLoading: true,
            products: []
        });
    });
    
    it('loadSuccess', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            isLoaded: false,
            isLoading: true
        };

        const products = [{}, {}] as any;
        const state = productsReducer(initialState, loadSuccess({products}));

        expect(state).toEqual({
            ...AppInitialState.products,
            isLoaded: true,
            isLoading: false,
            products
        });
    });
    
    it('loadFail', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            isLoaded: false,
            isLoading: true
        };

        const error = {error: "error"};
        const state = productsReducer(initialState, loadFail({error}));

        expect(state).toEqual({
            ...AppInitialState.products,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('remove', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            error: {},
            isRemoved: true,
            isRemoving: false
        };

        const product = {id: 1} as any;
        const state = productsReducer(initialState, remove({product}));

        expect(state).toEqual({
            ...AppInitialState.products,
            error: null,
            isRemoved: false,
            isRemoving: true
        });
    });
    
    it('removeSuccess', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            isRemoved: false,
            isRemoving: true
        };

        const state = productsReducer(initialState, removeSuccess());

        expect(state).toEqual({
            ...AppInitialState.products,
            isRemoved: true,
            isRemoving: false
        });
    });
    
    it('removeFail', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            isRemoved: false,
            isRemoving: true
        };

        const error = {error: "error"};
        const state = productsReducer(initialState, removeFail({error}));

        expect(state).toEqual({
            ...AppInitialState.products,
            error,
            isRemoved: false,
            isRemoving: false
        });
    });
  
});