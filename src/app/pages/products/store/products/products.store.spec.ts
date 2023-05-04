import { Product } from "src/app/model/product/product";
import { AppInitialState } from "src/app/store/app-initial-state";
import { load, loadFail, loadMoreProducts, loadSuccess, remove, removeFail, removeSuccess, updateProductOnList, updateProductOnListFail, updateProductOnListSuccess } from "./products.actions";
import { productsReducer } from "./products.reducers";
import { ProductsState } from "./products.state";

describe('Products store', () => {
    
    it('load', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            error: {},
            hasMoreToLoad: true,
            isLoaded: true,
            isLoading: false,
            isLoadingMoreProducts: true,
            page: 1,
            products: [{}] as any
        };

        const state = productsReducer(initialState, load());

        expect(state).toEqual({
            ...AppInitialState.products,
            error: null,
            hasMoreToLoad: false,
            isLoaded: false,
            isLoading: true,
            isLoadingMoreProducts: false,
            page: 0,
            products: []
        });
    });
    
    it('loadMoreProducts', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            isLoadingMoreProducts: false,
            page: 0
        };

        const state = productsReducer(initialState, loadMoreProducts());

        expect(state).toEqual({
            ...AppInitialState.products,
            isLoadingMoreProducts: true,
            page: 1
        });
    });

    describe('given loadSuccess', () => {

        let initialState: ProductsState;
        let products: Product[];

        beforeEach(() => {
            products = [{id: 2}, {id: 3}] as any;
            initialState = {
                ...AppInitialState.products,
                isLoaded: false,
                isLoading: true,
                isLoadingMoreProducts: true,
                products: [{id: 1}] as any
            };
        })
    
        it('when page is equal to 0, then replace existing products', () => {
            const state = productsReducer(initialState, loadSuccess({products}));
    
            expect(state).toEqual({
                ...AppInitialState.products,
                hasMoreToLoad: false,
                isLoaded: true,
                isLoading: false,
                isLoadingMoreProducts: false,
                products
            });
        });
    
        it('when page is different than 0, then add to existing products', () => {
            initialState.page = 1;

            const state = productsReducer(initialState, loadSuccess({products}));
    
            expect(state).toEqual({
                ...AppInitialState.products,
                hasMoreToLoad: false,
                isLoaded: true,
                isLoading: false,
                isLoadingMoreProducts: false,
                page: 1,
                products: [{id: 1}, {id: 2}, {id: 3}] as any
            });
        });
    
        it('when there are less than 30 products loaded, then do not allow to load more products', () => {
            const state = productsReducer(initialState, loadSuccess({products}));
    
            expect(state).toEqual({
                ...AppInitialState.products,
                hasMoreToLoad: false,
                isLoaded: true,
                isLoading: false,
                isLoadingMoreProducts: false,
                products
            });
        });
    
        it('when there are 30 products loaded, then allow to load more products', () => {
            products = Array.from(Array(30).keys()).map((v, index) => ({id: index+1})) as any;

            const state = productsReducer(initialState, loadSuccess({products}));
    
            expect(state).toEqual({
                ...AppInitialState.products,
                hasMoreToLoad: true,
                isLoaded: true,
                isLoading: false,
                isLoadingMoreProducts: false,
                products
            });
        });
    
        it('when products loaded are empty, then do not allow to load more products', () => {
            const products: any[] = [];
            const state = productsReducer(initialState, loadSuccess({products}));
    
            expect(state).toEqual({
                ...AppInitialState.products,
                hasMoreToLoad: false,
                isLoaded: true,
                isLoading: false,
                isLoadingMoreProducts: false,
                products
            });
        });

    })
    
    it('loadFail', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            isLoaded: false,
            isLoading: true,
            isLoadingMoreProducts: true,
        };

        const error = {error: "error"};
        const state = productsReducer(initialState, loadFail({error}));

        expect(state).toEqual({
            ...AppInitialState.products,
            error,
            isLoaded: false,
            isLoading: false,
            isLoadingMoreProducts: false
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
    
    it('updateProductOnList', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            error: {},
            isLoadingProductDetail: false,
            productDetailId: undefined
        };

        const state = productsReducer(initialState, updateProductOnList({id: "anyProductId"}));

        expect(state).toEqual({
            ...AppInitialState.products,
            error: undefined,
            isLoadingProductDetail: true,
            productDetailId: "anyProductId"
        });
    });

    describe('given update product on list success', () => {

        const products = [
            {id: "anyProductId1"},
            {id: "anyProductId2"}
        ] as any;

        const initialState: ProductsState = {
            ...AppInitialState.products,
            products,
            isLoadingProductDetail: true,
            productDetailId: "anyProductId"
        };

        it('when product doesnt exist on list, then return same list', () => {
            const product = {id: "anyOtherProductId"} as any;
            const state = productsReducer(initialState, updateProductOnListSuccess({product}));
    
            expect(state).toEqual({
                ...AppInitialState.products,
                products,
                isLoadingProductDetail: false,
                productDetailId: undefined
            });
        })

        it('when product exists on list, then update product on list', () => {
            const product = {id: "anyProductId1", isVisible: true} as any;
            const state = productsReducer(initialState, updateProductOnListSuccess({product}));
    
            expect(state).toEqual({
                ...AppInitialState.products,
                products: [
                    product,
                    products[1]
                ],
                isLoadingProductDetail: false,
                productDetailId: undefined
            });
        })

    })
    
    it('updateProductOnListFail', () => {
        const initialState: ProductsState = {
            ...AppInitialState.products,
            isLoadingProductDetail: true,
            productDetailId: "anyProductId"
        };

        const error = {error: "error"};
        const state = productsReducer(initialState, updateProductOnListFail({error}));

        expect(state).toEqual({
            ...AppInitialState.products,
            error,
            isLoadingProductDetail: false,
            productDetailId: undefined
        });
    });
  
});