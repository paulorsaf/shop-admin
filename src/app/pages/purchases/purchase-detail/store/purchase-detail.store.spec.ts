import { AppInitialState } from "src/app/store/app-initial-state";
import { loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess, updatePurchaseStatus, updatePurchaseStatusFail, updatePurchaseStatusSuccess } from "./purchase-detail.actions";
import { purchaseDetailReducer } from "./purchase-detail.reducers";
import { PurchaseDetailState } from "./purchase-detail.state";

fdescribe('Purchase detail store', () => {
    
    it('loadPurchaseDetail', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            error: {},
            isLoaded: true,
            isLoading: false,
            isUpdated: true,
            isUpdating: true,
            purchase: {} as any
        };

        const state = purchaseDetailReducer(initialState, loadPurchaseDetail({id: "anyId"}));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error: null,
            isLoaded: false,
            isLoading: true,
            isUpdated: false,
            isUpdating: false,
            purchase: undefined
        });
    });
    
    it('loadPurchaseDetailSuccess', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            isLoading: true
        };

        const purchase = {id: 1} as any;
        const state = purchaseDetailReducer(initialState, loadPurchaseDetailSuccess({purchase}));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            isLoaded: true,
            isLoading: false,
            purchase
        });
    });
    
    it('loadPurchaseDetailFail', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            isLoading: true
        };

        const error = {error: "error"};
        const state = purchaseDetailReducer(initialState, loadPurchaseDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('updatePurchaseStatus', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            error: {},
            isUpdated: true,
            isUpdating: false
        };

        const state = purchaseDetailReducer(initialState, updatePurchaseStatus({status: "anyStatus"}));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error: null,
            isUpdated: false,
            isUpdating: true
        });
    });
    
    it('updatePurchaseStatusSuccess', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            isUpdating: true
        };

        const purchase = {id: 1} as any;
        const state = purchaseDetailReducer(initialState, updatePurchaseStatusSuccess());

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            isUpdated: true,
            isUpdating: false
        });
    });
    
    it('updatePurchaseStatusFail', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            isUpdating: true
        };

        const error = {error: "error"};
        const state = purchaseDetailReducer(initialState, updatePurchaseStatusFail({error}));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error,
            isUpdated: false,
            isUpdating: false
        });
    });
  
});