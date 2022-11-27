import { AppInitialState } from "src/app/store/app-initial-state";
import { editPurchaseProduct, editPurchaseProductFail, editPurchaseProductSuccess, loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess, sendPurchaseToSystem, sendPurchaseToSystemFail, sendPurchaseToSystemSuccess, updatePurchaseStatus, updatePurchaseStatusFail, updatePurchaseStatusSuccess } from "./purchase-detail.actions";
import { purchaseDetailReducer } from "./purchase-detail.reducers";
import { PurchaseDetailState } from "./purchase-detail.state";

describe('Purchase detail store', () => {
    
    it('loadPurchaseDetail', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            error: {},
            isEditedProduct: true,
            isEditingProduct: true,
            isLoaded: true,
            isLoading: false,
            isSendingToSystem: true,
            isSentToSystem: true,
            isUpdated: true,
            isUpdating: true,
            purchase: {} as any
        };

        const state = purchaseDetailReducer(initialState, loadPurchaseDetail({id: "anyId"}));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error: null,
            isEditedProduct: false,
            isEditingProduct: false,
            isLoaded: false,
            isLoading: true,
            isSendingToSystem: false,
            isSentToSystem: false,
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
    
    it('sendPurchaseToSystem', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            error: {},
            isSentToSystem: true,
            isSendingToSystem: false
        };

        const state = purchaseDetailReducer(initialState, sendPurchaseToSystem());

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error: null,
            isSentToSystem: false,
            isSendingToSystem: true
        });
    });
    
    it('sendPurchaseToSystemSuccess', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            isSendingToSystem: true
        };

        const state = purchaseDetailReducer(initialState, sendPurchaseToSystemSuccess());

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            isSentToSystem: true,
            isSendingToSystem: false
        });
    });
    
    it('sendPurchaseToSystemFail', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            isSendingToSystem: true
        };

        const error = {error: "error"};
        const state = purchaseDetailReducer(initialState, sendPurchaseToSystemFail({error}));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error,
            isSentToSystem: false,
            isSendingToSystem: false
        });
    });
    
    it('editPurchaseProduct', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            error: {},
            isEditedProduct: true,
            isEditingProduct: false
        };

        const state = purchaseDetailReducer(initialState, editPurchaseProduct({
            productId: "anyProductId", stockId: "anyStockId", value: 1
        }));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error: null,
            isEditedProduct: false,
            isEditingProduct: true
        });
    });
    
    it('editPurchaseProductSuccess', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            isEditingProduct: true
        };

        const state = purchaseDetailReducer(initialState, editPurchaseProductSuccess());

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            isEditedProduct: true,
            isEditingProduct: false
        });
    });
    
    it('editPurchaseProductFail', () => {
        const initialState: PurchaseDetailState = {
            ...AppInitialState.purchaseDetail,
            isEditedProduct: false,
            isEditingProduct: true
        };

        const error = {error: "error"};
        const state = purchaseDetailReducer(initialState, editPurchaseProductFail({error}));

        expect(state).toEqual({
            ...AppInitialState.purchaseDetail,
            error,
            isEditedProduct: false,
            isEditingProduct: false
        });
    });
  
});