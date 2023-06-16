import { AppInitialState } from "src/app/store/app-initial-state";
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess, removeCategory, removeCategoryFail, removeCategorySuccess, updateCategoriesVisibility } from "./categories.actions";
import { categoriesReducer } from "./categories.reducers";
import { CategoriesState } from "./categories.state";
import { changeCategoryVisibility } from "../category-detail/store/category-detail.actions";

describe('Categories store', () => {
    
    it('loadCategories', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            categoryDetailId: "any",
            error: {},
            isLoaded: true,
            isLoading: false,
            categories: [{}] as any
        };

        const state = categoriesReducer(initialState, loadCategories());

        expect(state).toEqual({
            ...AppInitialState.categories,
            categoryDetailId: undefined,
            error: null,
            isLoaded: false,
            isLoading: true,
            categories: []
        });
    });
    
    it('loadCategoriesSuccess', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            isLoaded: false,
            isLoading: true
        };

        const categories = [{}, {}] as any;
        const state = categoriesReducer(initialState, loadCategoriesSuccess({categories}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            isLoaded: true,
            isLoading: false,
            categories
        });
    });
    
    it('loadCategoriesFail', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            isLoaded: false,
            isLoading: true
        };

        const error = {error: "error"};
        const state = categoriesReducer(initialState, loadCategoriesFail({error}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('removeCategory', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            error: {},
            isRemoved: true,
            isRemoving: false
        };

        const category = {id: 1} as any;
        const state = categoriesReducer(initialState, removeCategory({category}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            error: null,
            isRemoved: false,
            isRemoving: true
        });
    });
    
    it('removeCategorySuccess', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            isRemoved: false,
            isRemoving: true
        };

        const state = categoriesReducer(initialState, removeCategorySuccess());

        expect(state).toEqual({
            ...AppInitialState.categories,
            isRemoved: true,
            isRemoving: false
        });
    });
    
    it('removeCategoryFail', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            isRemoved: false,
            isRemoving: true
        };

        const error = {error: "error"}
        const state = categoriesReducer(initialState, removeCategoryFail({error}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            error,
            isRemoved: false,
            isRemoving: false
        });
    });
    
    it('changeCategoryVisibility', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            categoryDetailId: ""
        };

        const id = "anyCategoryId";
        const state = categoriesReducer(initialState, changeCategoryVisibility({id}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            categoryDetailId: id
        });
    });
    
    it('updateCategoriesVisibility', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            categories: [
                {id: "anyId", isVisible: true},
                {id: "chosenId", isVisible: false},
                {id: "anyOtherId", isVisible: true},
            ] as any
        };

        const id = "chosenId";
        const state = categoriesReducer(initialState, updateCategoriesVisibility({id}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            categories: [
                {id: "anyId", isVisible: true},
                {id: "chosenId", isVisible: true},
                {id: "anyOtherId", isVisible: true},
            ] as any
        });
    });
  
});