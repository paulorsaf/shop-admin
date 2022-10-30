import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { updateStock, updateStockFail, updateStockSuccess } from './update-stock.actions';
import { UpdateStockState } from './update-stock.state';

const initialState: UpdateStockState = AppInitialState.updateStock;

const _updateStockReducer = createReducer(initialState,
    on(updateStock, (state) => {
        return {
            ...state,
            error: undefined,
            isUpdated: false,
            isUpdating: true
        };
    }),
    on(updateStockSuccess, (state) => {
        return {
            ...state,
            isUpdated: true,
            isUpdating: false
        };
    }),
    on(updateStockFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isUpdated: false,
            isUpdating: false
        };
    })
);
 
export function updateStockReducer(state: UpdateStockState, action: any) {
  return _updateStockReducer(state, action);
}