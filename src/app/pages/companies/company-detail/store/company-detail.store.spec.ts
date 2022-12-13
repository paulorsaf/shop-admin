import { AppInitialState } from "src/app/store/app-initial-state";
import { clearAddressByZip, loadAddressByZipCode, loadAddressByZipCodeFail, loadAddressByZipCodeSuccess, loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAboutUs, saveCompanyDetailAboutUsFail, saveCompanyDetailAboutUsSuccess, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailLogo, saveCompanyDetailLogoFail, saveCompanyDetailLogoSuccess, saveCompanyDetailPayment, saveCompanyDetailPaymentFail, saveCompanyDetailPaymentSuccess, saveCompanyDetailSuccess, saveDeliveryPrice, saveDeliveryPriceFail, saveDeliveryPriceSuccess } from "./company-detail.actions";
import { companyDetailReducer } from "./company-detail.reducers";
import { CompanyDetailState } from "./company-detail.state";

describe('Company detail store', () => {
    
    it('loadCompanyDetail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            company: {} as any,
            error: {},
            isLoaded: true,
            isLoading: false,
            isUploadedLogo: true,
            isUploadingLogo: true,
            isLoadedAddress: true,
            isLoadingAddress: true
        };

        const id = "anyId";
        const state = companyDetailReducer(initialState, loadCompanyDetail({id}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            company: undefined,
            error: undefined,
            isLoaded: false,
            isLoading: true,
            isUploadedLogo: false,
            isUploadingLogo: false,
            isLoadedAddress: false,
            isLoadingAddress: false
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

        const details = {id: "anyDetails"} as any;
        const state = companyDetailReducer(initialState, saveCompanyDetail({details}));

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
    
    it('saveCompanyDetailLogo', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            error: {},
            isUploadedLogo: true,
            isUploadingLogo: false
        };

        const file = {id: "anyfile"} as any;
        const state = companyDetailReducer(initialState, saveCompanyDetailLogo({file}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error: undefined,
            isUploadedLogo: false,
            isUploadingLogo: true
        });
    });
    
    it('saveCompanyDetailLogoSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isUploadingLogo: true
        };

        const state = companyDetailReducer(initialState, saveCompanyDetailLogoSuccess());

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            isUploadedLogo: true,
            isUploadingLogo: false
        });
    });
    
    it('saveCompanyDetailLogoFail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isUploadingLogo: true
        };

        const error = {error: "error"};
        const state = companyDetailReducer(initialState, saveCompanyDetailLogoFail({error}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error,
            isUploadedLogo: false,
            isUploadingLogo: false
        });
    });
    
    it('loadAddressByZipCode', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            error: {},
            isLoadedAddress: true,
            isLoadingAddress: false
        };

        const zipCode = "anyZipCode";
        const state = companyDetailReducer(initialState, loadAddressByZipCode({zipCode}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            address: undefined,
            error: undefined,
            isLoadedAddress: false,
            isLoadingAddress: true
        });
    });
    
    it('loadAddressByZipCodeSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isLoadingAddress: true
        };

        const address = {id: "anyAddress"} as any;
        const state = companyDetailReducer(initialState, loadAddressByZipCodeSuccess({address}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            address,
            isLoadedAddress: true,
            isLoadingAddress: false
        });
    });
    
    it('loadAddressByZipCodeSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isLoadingAddress: true
        };

        const error = {error: "error"} as any;
        const state = companyDetailReducer(initialState, loadAddressByZipCodeFail({error}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error,
            isLoadedAddress: false,
            isLoadingAddress: false
        });
    });
    
    it('clearAddressByZip', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            address: {} as any,
            error: {} as any,
            isLoadedAddress: true,
            isLoadingAddress: true
        };

        const state = companyDetailReducer(initialState, clearAddressByZip());

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            address: undefined,
            error: undefined,
            isLoadedAddress: false,
            isLoadingAddress: false
        });
    });
    
    it('saveCompanyDetailAboutUs', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            error: {},
            isSavedAboutUs: true,
            isSavingAboutUs: false
        };

        const html = "anyHtml";
        const state = companyDetailReducer(initialState, saveCompanyDetailAboutUs({html}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error: undefined,
            isSavedAboutUs: false,
            isSavingAboutUs: true
        });
    });
    
    it('saveCompanyDetailAboutUsSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingAboutUs: true
        };

        const state = companyDetailReducer(initialState, saveCompanyDetailAboutUsSuccess());

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            isSavedAboutUs: true,
            isSavingAboutUs: false
        });
    });
    
    it('saveCompanyDetailAboutUsSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingAboutUs: true
        };

        const error = {error: "error"};
        const state = companyDetailReducer(initialState, saveCompanyDetailAboutUsFail({error}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error,
            isSavedAboutUs: false,
            isSavingAboutUs: false
        });
    });
    
    it('saveCompanyDetailPayment', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            error: {},
            isSavedPayment: true,
            isSavingPayment: false
        };

        const payment = {id: "anyPayment"} as any;
        const state = companyDetailReducer(initialState, saveCompanyDetailPayment({payment}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error: undefined,
            isSavedPayment: false,
            isSavingPayment: true
        });
    });
    
    it('saveCompanyDetailPaymentFail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingPayment: true
        };

        const error = {error: "error"};
        const state = companyDetailReducer(initialState, saveCompanyDetailPaymentFail({error}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error,
            isSavedPayment: false,
            isSavingPayment: false
        });
    });
    
    it('saveDeliveryPrice', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            error: {},
            isSavedDeliveryPrice: true,
            isSavingDeliveryPrice: false
        };

        const state = companyDetailReducer(initialState, saveDeliveryPrice({price: 10}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error: undefined,
            isSavedDeliveryPrice: false,
            isSavingDeliveryPrice: true
        });
    });
    
    it('saveDeliveryPriceSuccess', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingDeliveryPrice: true
        };

        const state = companyDetailReducer(initialState, saveDeliveryPriceSuccess());

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error: undefined,
            isSavedDeliveryPrice: true,
            isSavingDeliveryPrice: false
        });
    });
    
    it('saveDeliveryPriceFail', () => {
        const initialState: CompanyDetailState = {
            ...AppInitialState.companyDetail,
            isSavingDeliveryPrice: true
        };

        const error = {error: "error"};
        const state = companyDetailReducer(initialState, saveDeliveryPriceFail({error}));

        expect(state).toEqual({
            ...AppInitialState.companyDetail,
            error,
            isSavedDeliveryPrice: false,
            isSavingDeliveryPrice: false
        });
    });
  
});