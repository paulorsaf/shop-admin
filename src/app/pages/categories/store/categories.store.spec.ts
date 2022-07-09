import { AppInitialState } from "src/app/store/app-initial-state";
import { load, loadFail, loadSuccess } from "./categories.actions";
import { categoriesReducer } from "./categories.reducers";
import { CategoriesState } from "./categories.state";

describe('Products store', () => {
    
    it('categories', () => {
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
  
});