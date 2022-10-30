import { AppInitialState } from "src/app/store/app-initial-state";
import { updateStockReducer } from "./update-stock.reducers";
import { updateStock, updateStockFail, updateStockSuccess } from "./update-stock.actions";
import { UpdateStockState } from "./update-stock.state";

describe('Update stock store', () => {
    
    it('updateStock', () => {
        const initialState: UpdateStockState = {
            ...AppInitialState.updateStock,
            error: {},
            isUpdated: true,
            isUpdating: false
        };

        const state = updateStockReducer(initialState, updateStock());

        expect(state).toEqual({
            ...AppInitialState.updateStock,
            error: undefined,
            isUpdated: false,
            isUpdating: true
        });
    });
    
    it('updateStockSuccess', () => {
        const initialState: UpdateStockState = {
            ...AppInitialState.updateStock,
            isUpdating: true
        };

        const state = updateStockReducer(initialState, updateStockSuccess());

        expect(state).toEqual({
            ...AppInitialState.updateStock,
            isUpdated: true,
            isUpdating: false
        });
    });
    
    it('updateStockFail', () => {
        const initialState: UpdateStockState = {
            ...AppInitialState.updateStock,
            isUpdating: true
        };

        const error = {error: "error"} as any;
        const state = updateStockReducer(initialState, updateStockFail({error}));

        expect(state).toEqual({
            ...AppInitialState.updateStock,
            error,
            isUpdated: false,
            isUpdating: false
        });
    });
  
});