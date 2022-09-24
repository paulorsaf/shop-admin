import { AppInitialState } from "src/app/store/app-initial-state";
import { cupomsReducer } from "./cupoms.reducers";
import { loadCupoms, loadCupomsFail, loadCupomsSuccess, saveCupom, saveCupomFail, saveCupomSuccess } from "./cupoms.actions";
import { CupomsState } from "./cupoms.state";

describe('Cupoms store', () => {

    const error = {error: "error"};
    
    it('loadCupoms', () => {
        const initialState: CupomsState = {
            ...AppInitialState.cupoms,
            error: {},
            isLoaded: true,
            isLoading: false,
            isSaved: true,
            isSaving: true,
            cupoms: [{}] as any
        };

        const state = cupomsReducer(initialState, loadCupoms());

        expect(state).toEqual({
            ...AppInitialState.cupoms,
            error: null,
            isLoaded: false,
            isLoading: true,
            isSaved: false,
            isSaving: false,
            cupoms: []
        });
    });
    
    it('loadCupomsSuccess', () => {
        const initialState: CupomsState = {
            ...AppInitialState.cupoms,
            isLoaded: false,
            isLoading: true
        };

        const cupoms = [{id: 1}] as any;
        const state = cupomsReducer(initialState, loadCupomsSuccess({cupoms}));

        expect(state).toEqual({
            ...AppInitialState.cupoms,
            isLoaded: true,
            isLoading: false,
            cupoms
        });
    });
    
    it('loadCupomsFail', () => {
        const initialState: CupomsState = {
            ...AppInitialState.cupoms,
            isLoaded: false,
            isLoading: true
        };

        const state = cupomsReducer(initialState, loadCupomsFail({error}));

        expect(state).toEqual({
            ...AppInitialState.cupoms,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('saveCupom', () => {
        const initialState: CupomsState = {
            ...AppInitialState.cupoms,
            error: {},
            isSaved: true,
            isSaving: false
        };

        const cupom = {id: 1} as any;
        const state = cupomsReducer(initialState, saveCupom({cupom}));

        expect(state).toEqual({
            ...AppInitialState.cupoms,
            error: null,
            isSaved: false,
            isSaving: true
        });
    });
    
    it('saveCupomSuccess', () => {
        const initialState: CupomsState = {
            ...AppInitialState.cupoms,
            isSaving: true
        };

        const state = cupomsReducer(initialState, saveCupomSuccess());

        expect(state).toEqual({
            ...AppInitialState.cupoms,
            isSaved: true,
            isSaving: false
        });
    });
    
    it('saveCupomFail', () => {
        const initialState: CupomsState = {
            ...AppInitialState.cupoms,
            isSaving: true
        };

        const state = cupomsReducer(initialState, saveCupomFail({error}));

        expect(state).toEqual({
            ...AppInitialState.cupoms,
            error,
            isSaved: false,
            isSaving: false
        });
    });
  
});