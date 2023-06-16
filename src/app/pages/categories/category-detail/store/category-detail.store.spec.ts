import { AppInitialState } from "src/app/store/app-initial-state";
import { changeCategoryVisibility, changeCategoryVisibilitySuccess, clear, loadDetail, loadDetailFail, loadDetailSuccess, saveDetail, saveDetailFail, saveDetailSuccess } from "./category-detail.actions";
import { categoryDetailReducer } from "./category-detail.reducers";
import { CategoryDetailState } from "./category-detail.state";

describe('Category store', () => {
    
    it('loadDetail', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            error: {},
            isLoaded: true,
            isLoading: false,
            category: {} as any
        };

        const state = categoryDetailReducer(initialState, loadDetail({id: '1'}));

        expect(state).toEqual({
            ...AppInitialState.categoryDetail,
            error: null,
            isLoaded: false,
            isLoading: true,
            category: undefined
        });
    });
    
    it('loadDetailSuccess', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            isLoaded: false,
            isLoading: true
        };

        const category = {id: 1} as any;
        const state = categoryDetailReducer(initialState, loadDetailSuccess({category}));

        expect(state).toEqual({
            ...AppInitialState.categoryDetail,
            isLoaded: true,
            isLoading: false,
            category
        });
    });
    
    it('loadDetailFail', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            isLoaded: false,
            isLoading: true
        };

        const error = {error: "error"};
        const state = categoryDetailReducer(initialState, loadDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.categoryDetail,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('saveDetail', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            error: {},
            isSaved: true,
            isSaving: false
        };

        const category = {id: '1', name: "any"} as any;
        const state = categoryDetailReducer(initialState, saveDetail({category}));

        expect(state).toEqual({
            ...AppInitialState.categoryDetail,
            error: null,
            isSaved: false,
            isSaving: true
        });
    });
    
    it('saveDetailSuccess', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            isSaved: false,
            isSaving: true
        };

        const state = categoryDetailReducer(initialState, saveDetailSuccess());

        expect(state).toEqual({
            ...AppInitialState.categoryDetail,
            isSaved: true,
            isSaving: false
        });
    });
    
    it('saveDetailFail', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            isSaved: false,
            isSaving: true
        };

        const error = {error: "error"};
        const state = categoryDetailReducer(initialState, saveDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.categoryDetail,
            error,
            isSaved: false,
            isSaving: false
        });
    });
    
    it('clear', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            category: {id: 1} as any,
            error: {},
            isLoaded: true,
            isLoading: true,
            isSaved: true,
            isSaving: true
        };

        const state = categoryDetailReducer(initialState, clear());

        expect(state).toEqual({
            ...AppInitialState.categoryDetail
        });
    });
    
    it('changeCategoryVisibility', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            error: {},
            isChangingVisibility: false
        };

        const state = categoryDetailReducer(initialState, changeCategoryVisibility({id: "anyId"}));

        expect(state).toEqual({
            ...AppInitialState.categoryDetail,
            error: null,
            isChangingVisibility: true
        });
    });
    
    it('changeCategoryVisibilitySuccess', () => {
        const initialState: CategoryDetailState = {
            ...AppInitialState.categoryDetail,
            isChangingVisibility: true
        };

        const id = "anyId";
        const state = categoryDetailReducer(initialState, changeCategoryVisibilitySuccess({id}));

        expect(state).toEqual({
            ...AppInitialState.categoryDetail,
            isChangingVisibility: false
        });
    });
  
});