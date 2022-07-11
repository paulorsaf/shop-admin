import { AppInitialState } from "src/app/store/app-initial-state";
import { load, loadFail, loadSuccess, remove, removeFail, removeSuccess } from "./categories.actions";
import { categoriesReducer } from "./categories.reducers";
import { CategoriesState } from "./categories.state";

describe('Categories store', () => {
    
    it('load', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            error: {},
            isLoaded: true,
            isLoading: false,
            categories: [{}] as any
        };

        const state = categoriesReducer(initialState, load());

        expect(state).toEqual({
            ...AppInitialState.categories,
            error: null,
            isLoaded: false,
            isLoading: true,
            categories: []
        });
    });
    
    it('loadSuccess', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            isLoaded: false,
            isLoading: true
        };

        const categories = [{}, {}] as any;
        const state = categoriesReducer(initialState, loadSuccess({categories}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            isLoaded: true,
            isLoading: false,
            categories
        });
    });
    
    it('loadFail', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            isLoaded: false,
            isLoading: true
        };

        const error = {error: "error"};
        const state = categoriesReducer(initialState, loadFail({error}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('remove', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            error: {},
            isRemoved: true,
            isRemoving: false
        };

        const category = {id: 1} as any;
        const state = categoriesReducer(initialState, remove({category}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            error: null,
            isRemoved: false,
            isRemoving: true
        });
    });
    
    it('removeSuccess', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            isRemoved: false,
            isRemoving: true
        };

        const state = categoriesReducer(initialState, removeSuccess());

        expect(state).toEqual({
            ...AppInitialState.categories,
            isRemoved: true,
            isRemoving: false
        });
    });
    
    it('removeFail', () => {
        const initialState: CategoriesState = {
            ...AppInitialState.categories,
            isRemoved: false,
            isRemoving: true
        };

        const error = {error: "error"}
        const state = categoriesReducer(initialState, removeFail({error}));

        expect(state).toEqual({
            ...AppInitialState.categories,
            error,
            isRemoved: false,
            isRemoving: false
        });
    });
  
});