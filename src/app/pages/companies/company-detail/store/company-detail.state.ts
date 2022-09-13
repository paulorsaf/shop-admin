import { Address } from "src/app/model/address/address";
import { Company } from "src/app/model/company/company";

export type CompanyDetailState = {
    address?: Address;
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isLoadedAddress: boolean;
    isLoadingAddress: boolean;
    isSavedAboutUs: boolean;
    isSavingAboutUs: boolean;
    isSavedAddress: boolean;
    isSavingAddress: boolean;
    isSavedCompany: boolean;
    isSavingCompany: boolean;
    isSavedPayment: boolean;
    isSavingPayment: boolean;
    isUploadedLogo: boolean;
    isUploadingLogo: boolean;
    company?: Company;
}