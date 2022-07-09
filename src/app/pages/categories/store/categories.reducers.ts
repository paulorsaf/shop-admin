import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { CategoriesState } from './categories.state';
import { load, loadFail, loadSuccess } from './categories.actions';

const initialState: CategoriesState = AppInitialState.categories;

const _categoriesReducer = createReducer(initialState,
    on(load, (state) => {
        return {
            ...state,
            error: null,
            isLoaded: false,
            isLoading: true,
            categories: []
        };
    }),
    on(loadSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            categories: action.categories
        };
    }),
    on(loadFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
);
 
export function categoriesReducer(state: CategoriesState, action: any) {
  return _categoriesReducer(state, action);
}