import { AppInitialState } from "src/app/store/app-initial-state";
import { loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailSuccess } from "./company-detail.actions";
import { companyDetailReducer } from "./company-detail.reducers";
import { CompanyDetailState } from "./company-detail.state";

describe('Company detail store', () => {
    
    it('loadCompanyDetail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            company: {} as any,
            error: {},
            isLoaded: true,
            isLoading: false
        };

        const id = "anyId";
        const state = companyDetailReducer(initialState, loadCompanyDetail({id}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            company: undefined,
            error: undefined,
            isLoaded: false,
            isLoading: true
        });
    });
    
    it('loadCompanyDetailSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isLoading: true
        };

        const company = {id: "anyId"} as any;
        const state = companyDetailReducer(initialState, loadCompanyDetailSuccess({company}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            company,
            isLoaded: true,
            isLoading: false
        });
    });
    
    it('loadCompanyDetailFail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isLoading: true
        };

        const error = {error: "error"} as any;
        const state = companyDetailReducer(initialState, loadCompanyDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('saveCompanyDetailAddress', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            error: {},
            isSavedAddress: true,
            isSavingAddress: false
        };

        const address = {id: "anyAddress"} as any;
        const state = companyDetailReducer(initialState, saveCompanyDetailAddress({address}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error: undefined,
            isSavedAddress: false,
            isSavingAddress: true
        });
    });
    
    it('saveCompanyDetailAddressSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingAddress: true
        };

        const state = companyDetailReducer(initialState, saveCompanyDetailAddressSuccess());

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            isSavedAddress: true,
            isSavingAddress: false
        });
    });
    
    it('saveCompanyDetailAddressFail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingAddress: true
        };

        const error = {error: "error"};
        const state = companyDetailReducer(initialState, saveCompanyDetailAddressFail({error}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error,
            isSavedAddress: false,
            isSavingAddress: false
        });
    });
    
    it('saveCompanyDetail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            error: {},
            isSavedCompany: true,
            isSavingCompany: false
        };

        const state = companyDetailReducer(initialState, saveCompanyDetail({name: "anyName"}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error: undefined,
            isSavedCompany: false,
            isSavingCompany: true
        });
    });
    
    it('saveCompanyDetailSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingCompany: true
        };

        const state = companyDetailReducer(initialState, saveCompanyDetailSuccess());

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            isSavedCompany: true,
            isSavingCompany: false
        });
    });
    
    it('saveCompanyDetailFail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingCompany: true
        };

        const error = {error: "error"};
        const state = companyDetailReducer(initialState, saveCompanyDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error,
            isSavedCompany: false,
            isSavingCompany: false
        });
    });
  
});