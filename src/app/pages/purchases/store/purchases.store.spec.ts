import { AppInitialState } from "src/app/store/app-initial-state";
import { purchasesReducer } from "./purchases.reducers";
import { loadPurchases, loadPurchasesFail, loadPurchasesSuccess, printAllPurchases, printAllPurchasesSuccess, printPurchase, printPurchaseSuccess } from "./purchases.actions";
import { PurchasesState } from "./purchases.state";

describe('Purchases store', () => {
    
    it('loadPurchases', () => {
        const initialState: PurchasesState = {
            ...AppInitialState.purchases,
            error: {},
            isLoaded: true,
            isLoading: false,
            isPrinting: true,
            isPrintingAll: true,
            purchases: [{}] as any
        };

        const state = purchasesReducer(initialState, loadPurchases());

        expect(state).toEqual({
            ...AppInitialState.purchases,
            error: null,
            isLoaded: false,
            isLoading: true,
            isPrinting: false,
            isPrintingAll: false,
            purchases: []
        });
    });
    
    it('loadPurchasesSuccess', () => {
        const initialState: PurchasesState = {
            ...AppInitialState.purchases,
            isLoaded: false,
            isLoading: true
        };

        const purchases = [{id: 1}] as any;
        const state = purchasesReducer(initialState, loadPurchasesSuccess({purchases}));

        expect(state).toEqual({
            ...AppInitialState.purchases,
            isLoaded: true,
            isLoading: false,
            purchases
        });
    });
    
    it('loadPurchasesFail', () => {
        const initialState: PurchasesState = {
            ...AppInitialState.purchases,
            isLoaded: false,
            isLoading: true
        };

        const error = {error: "error"};
        const state = purchasesReducer(initialState, loadPurchasesFail({error}));

        expect(state).toEqual({
            ...AppInitialState.purchases,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('printPurchase', () => {
        const initialState: PurchasesState = {
            ...AppInitialState.purchases,
            isPrinting: false
        };

        const state = purchasesReducer(initialState, printPurchase({id: "1"}));

        expect(state).toEqual({
            ...AppInitialState.purchases,
            isPrinting: true
        });
    });
    
    it('printPurchaseSuccess', () => {
        const initialState: PurchasesState = {
            ...AppInitialState.purchases,
            isPrinting: true
        };

        const state = purchasesReducer(initialState, printPurchaseSuccess());

        expect(state).toEqual({
            ...AppInitialState.purchases,
            isPrinting: false
        });
    });
    
    it('printAllPurchases', () => {
        const initialState: PurchasesState = {
            ...AppInitialState.purchases,
            isPrintingAll: false
        };

        const state = purchasesReducer(initialState, printAllPurchases());

        expect(state).toEqual({
            ...AppInitialState.purchases,
            isPrintingAll: true
        });
    });
    
    it('printAllPurchasesSuccess', () => {
        const initialState: PurchasesState = {
            ...AppInitialState.purchases,
            isPrintingAll: true
        };

        const state = purchasesReducer(initialState, printAllPurchasesSuccess());

        expect(state).toEqual({
            ...AppInitialState.purchases,
            isPrintingAll: false
        });
    });
  
});