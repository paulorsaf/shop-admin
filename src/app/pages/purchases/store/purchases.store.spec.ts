import { AppInitialState } from "src/app/store/app-initial-state";
import { purchasesReducer } from "./purchases.reducers";
import { loadPurchases, loadPurchasesFail, loadPurchasesSuccess } from "./purchases.actions";
import { PurchasesState } from "./purchases.state";

describe('Purchases store', () => {
    
    it('loadPurchases', () => {
        const initialState: PurchasesState = {
            ...AppInitialState.purchases,
            error: {},
            isLoaded: true,
            isLoading: false,
            purchases: [{}] as any
        };

        const state = purchasesReducer(initialState, loadPurchases());

        expect(state).toEqual({
            ...AppInitialState.purchases,
            error: null,
            isLoaded: false,
            isLoading: true,
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
  
});