import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { clearAddressByZip, loadAddressByZipCode, loadAddressByZipCodeFail, loadAddressByZipCodeSuccess, loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAboutUs, saveCompanyDetailAboutUsFail, saveCompanyDetailAboutUsSuccess, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailLogo, saveCompanyDetailLogoFail, saveCompanyDetailLogoSuccess, saveCompanyDetailPayment, saveCompanyDetailPaymentFail, saveCompanyDetailPaymentSuccess, saveCompanyDetailSuccess, saveDeliveryPrice, saveDeliveryPriceFail, saveDeliveryPriceSuccess, saveServiceTax, saveServiceTaxFail, saveServiceTaxSuccess } from './company-detail.actions';
import { CompanyDetailState } from './company-detail.state';

const initialState: CompanyDetailState = AppInitialState.companyDetail;

const _companyDetailReducer = createReducer(initialState,
    on(loadCompanyDetail, (state) => {
        return {
            ...state,
            company: undefined,
            error: undefined,
            isLoaded: false,
            isLoading: true,
            isUploadedLogo: false,
            isUploadingLogo: false,
            isLoadedAddress: false,
            isLoadingAddress: false
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
    }),
    on(saveCompanyDetailLogo, (state) => {
        return {
            ...state,
            error: undefined,
            isUploadedLogo: false,
            isUploadingLogo: true
        };
    }),
    on(saveCompanyDetailLogoSuccess, (state) => {
        return {
            ...state,
            isUploadedLogo: true,
            isUploadingLogo: false
        };
    }),
    on(saveCompanyDetailLogoFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isUploadedLogo: false,
            isUploadingLogo: false
        };
    }),
    on(loadAddressByZipCode, (state) => {
        return {
            ...state,
            address: undefined,
            error: undefined,
            isLoadedAddress: false,
            isLoadingAddress: true
        };
    }),
    on(loadAddressByZipCodeSuccess, (state, action) => {
        return {
            ...state,
            address: action.address,
            isLoadedAddress: true,
            isLoadingAddress: false
        };
    }),
    on(loadAddressByZipCodeFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoadedAddress: false,
            isLoadingAddress: false
        };
    }),
    on(clearAddressByZip, (state) => {
        return {
            ...state,
            address: undefined,
            error: undefined,
            isLoadedAddress: false,
            isLoadingAddress: false
        };
    }),
    on(saveCompanyDetailAboutUs, (state) => {
        return {
            ...state,
            error: undefined,
            isSavedAboutUs: false,
            isSavingAboutUs: true
        };
    }),
    on(saveCompanyDetailAboutUsSuccess, (state) => {
        return {
            ...state,
            isSavedAboutUs: true,
            isSavingAboutUs: false
        };
    }),
    on(saveCompanyDetailAboutUsFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSavedAboutUs: false,
            isSavingAboutUs: false
        };
    }),
    on(saveCompanyDetailPayment, (state) => {
        return {
            ...state,
            error: undefined,
            isSavedPayment: false,
            isSavingPayment: true
        };
    }),
    on(saveCompanyDetailPaymentSuccess, (state) => {
        return {
            ...state,
            isSavedPayment: true,
            isSavingPayment: false
        };
    }),
    on(saveCompanyDetailPaymentFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSavedPayment: false,
            isSavingPayment: false
        };
    }),
    on(saveDeliveryPrice, (state) => {
        return {
            ...state,
            error: undefined,
            isSavedDeliveryPrice: false,
            isSavingDeliveryPrice: true
        };
    }),
    on(saveDeliveryPriceSuccess, (state) => {
        return {
            ...state,
            isSavedDeliveryPrice: true,
            isSavingDeliveryPrice: false
        };
    }),
    on(saveDeliveryPriceFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSavedDeliveryPrice: false,
            isSavingDeliveryPrice: false
        };
    }),
    on(saveServiceTax, (state) => {
        return {
            ...state,
            error: undefined,
            isSavedServiceTax: false,
            isSavingServiceTax: true
        };
    }),
    on(saveServiceTaxSuccess, (state) => {
        return {
            ...state,
            isSavedServiceTax: true,
            isSavingServiceTax: false
        };
    }),
    on(saveServiceTaxFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSavedServiceTax: false,
            isSavingServiceTax: false
        };
    })
);
 
export function companyDetailReducer(state: CompanyDetailState, action: any) {
  return _companyDetailReducer(state, action);
}