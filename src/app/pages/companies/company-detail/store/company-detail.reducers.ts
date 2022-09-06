import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailSuccess } from './company-detail.actions';
import { CompanyDetailState } from './company-detail.state';

const initialState: CompanyDetailState = AppInitialState.companyDetail;

const _companyDetailReducer = createReducer(initialState,
    on(loadCompanyDetail, (state) => {
        return {
            ...state,
            company: undefined,
            error: undefined,
            isLoaded: false,
            isLoading: true
        };
    }),
    on(loadCompanyDetailSuccess, (state, action) => {
        return {
            ...state,
            company: action.company,
            isLoaded: true,
            isLoading: false
        };
    }),
    on(loadCompanyDetailFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(saveCompanyDetailAddress, (state) => {
        return {
            ...state,
            error: undefined,
            isSavedAddress: false,
            isSavingAddress: true
        };
    }),
    on(saveCompanyDetailAddressSuccess, (state) => {
        return {
            ...state,
            isSavedAddress: true,
            isSavingAddress: false
        };
    }),
    on(saveCompanyDetailAddressFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSavedAddress: false,
            isSavingAddress: false
        };
    }),
    on(saveCompanyDetail, (state) => {
        return {
            ...state,
            error: undefined,
            isSavedCompany: false,
            isSavingCompany: true
        };
    }),
    on(saveCompanyDetailSuccess, (state) => {
        return {
            ...state,
            isSavedCompany: true,
            isSavingCompany: false
        };
    }),
    on(saveCompanyDetailFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSavedCompany: false,
            isSavingCompany: false
        };
    })
);
 
export function companyDetailReducer(state: CompanyDetailState, action: any) {
  return _companyDetailReducer(state, action);
}