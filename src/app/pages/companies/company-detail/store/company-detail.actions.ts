import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/model/address/address";
import { Company, CompanyDetails, Payment } from "src/app/model/company/company";

export const loadCompanyDetail = createAction('[Company detail] load', props<{id: string}>());
export const loadCompanyDetailSuccess = createAction('[Company detail] load success', props<{company: Company}>());
export const loadCompanyDetailFail = createAction('[Company detail] load fail', props<{error: any}>());

export const loadAddressByZipCode = createAction('[Company detail] load address by zip code', props<{zipCode: string}>());
export const loadAddressByZipCodeSuccess = createAction('[Company detail] load address by zip code success', props<{address: Address}>());
export const loadAddressByZipCodeFail = createAction('[Company detail] load address by zip code fail', props<{error: any}>());
export const clearAddressByZip = createAction('[Company detail] clear address by zip code');

export const saveCompanyDetailAddress = createAction('[Company detail] save address', props<{address: Address}>());
export const saveCompanyDetailAddressSuccess = createAction('[Company detail] save address success');
export const saveCompanyDetailAddressFail = createAction('[Company detail] save address fail', props<{error: any}>());

export const saveCompanyDetail = createAction('[Company detail] save', props<{details: CompanyDetails}>());
export const saveCompanyDetailSuccess = createAction('[Company detail] save success');
export const saveCompanyDetailFail = createAction('[Company detail] save fail', props<{error: any}>());

export const saveCompanyDetailLogo = createAction('[Company detail] upload logo', props<{file: any}>());
export const saveCompanyDetailLogoSuccess = createAction('[Company detail] upload logo success');
export const saveCompanyDetailLogoFail = createAction('[Company detail] upload logo fail', props<{error: any}>());

export const saveCompanyDetailAboutUs = createAction('[Company detail] save about us', props<{html: string}>());
export const saveCompanyDetailAboutUsSuccess = createAction('[Company detail] save about us success');
export const saveCompanyDetailAboutUsFail = createAction('[Company detail] save about us fail', props<{error: any}>());

export const saveCompanyDetailPayment = createAction('[Company detail] save payment', props<{payment: Payment}>());
export const saveCompanyDetailPaymentSuccess = createAction('[Company detail] save payment success');
export const saveCompanyDetailPaymentFail = createAction('[Company detail] save payment fail', props<{error: any}>());

export const saveDeliveryPrice = createAction('[Company detail] save delivery price', props<{price: number}>());
export const saveDeliveryPriceSuccess = createAction('[Company detail] save delivery price success');
export const saveDeliveryPriceFail = createAction('[Company detail] save delivery price fail', props<{error: any}>());