import { AppInitialState } from "src/app/store/app-initial-state";
import { loadDetail, loadDetailFail, loadDetailSuccess } from "./category-detail.actions";
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
  
});