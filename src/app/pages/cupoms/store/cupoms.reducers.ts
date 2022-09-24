import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { CupomsState } from './cupoms.state';
import { loadCupoms, loadCupomsFail, loadCupomsSuccess, saveCupom, saveCupomFail, saveCupomSuccess } from './cupoms.actions';

const initialState: CupomsState = AppInitialState.cupoms;

const _cupomsReducer = createReducer(initialState,
    on(loadCupoms, (state) => {
        return {
            ...state,
            error: null,
            isLoaded: false,
            isLoading: true,
            isSaved: false,
            isSaving: false,
            cupoms: []
        };
    }),
    on(loadCupomsSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            cupoms: action.cupoms
        };
    }),
    on(loadCupomsFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(saveCupom, (state) => {
        return {
            ...state,
            error: null,
            isSaved: false,
            isSaving: true
        };
    }),
    on(saveCupomSuccess, (state) => {
        return {
            ...state,
            isSaved: true,
            isSaving: false
        };
    }),
    on(saveCupomFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSaved: false,
            isSaving: false
        };
    })
);
 
export function cupomsReducer(state: CupomsState, action: any) {
  return _cupomsReducer(state, action);
}