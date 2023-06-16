import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { CategoriesState } from './categories.state';
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess, removeCategory, removeCategoryFail, removeCategorySuccess, updateCategoriesVisibility } from './categories.actions';
import { changeCategoryVisibility, changeCategoryVisibilityFail, changeCategoryVisibilitySuccess } from '../category-detail/store/category-detail.actions';

const initialState: CategoriesState = AppInitialState.categories;

const _categoriesReducer = createReducer(initialState,
    on(loadCategories, (state) => {
        return {
            ...state,
            categoryDetailId: undefined,
            error: null,
            isLoaded: false,
            isLoading: true,
            categories: []
        };
    }),
    on(loadCategoriesSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            categories: action.categories
        };
    }),
    on(loadCategoriesFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(removeCategory, (state) => {
        return {
            ...state,
            error: null,
            isRemoved: false,
            isRemoving: true
        };
    }),
    on(removeCategorySuccess, (state) => {
        return {
            ...state,
            isRemoved: true,
            isRemoving: false
        };
    }),
    on(removeCategoryFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isRemoved: false,
            isRemoving: false
        };
    }),
    on(changeCategoryVisibility, (state, action) => {
        return {
            ...state,
            categoryDetailId: action.id
        };
    }),
    on(changeCategoryVisibilitySuccess, (state) => {
        return {
            ...state,
            categoryDetailId: undefined
        };
    }),
    on(changeCategoryVisibilityFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            categoryDetailId: undefined
        };
    }),
    on(updateCategoriesVisibility, (state, action) => {
        return {
            ...state,
            categories: state.categories
                .map(c => c.id === action.id ? {...c, isVisible: !c.isVisible} : c)
        };
    })
);
 
export function categoriesReducer(state: CategoriesState, action: any) {
  return _categoriesReducer(state, action);
}