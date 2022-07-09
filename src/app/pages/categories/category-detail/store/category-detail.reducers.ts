import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadDetail, loadDetailFail, loadDetailSuccess } from './category-detail.actions';
import { CategoryDetailState } from './category-detail.state';

const initialState: CategoryDetailState = AppInitialState.categoryDetail;

const _categoryDetailReducer = createReducer(initialState,
    on(loadDetail, (state) => {
        return {
            ...state,
            error: null,
            isLoaded: false,
            isLoading: true,
            category: undefined
        };
    }),
    on(loadDetailSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            category: action.category
        };
    }),
    on(loadDetailFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
);
 
export function categoryDetailReducer(state: CategoryDetailState, action: any) {
  return _categoryDetailReducer(state, action);
}