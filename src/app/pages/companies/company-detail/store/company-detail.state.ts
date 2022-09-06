import { Company } from "src/app/model/company/company";

export type CompanyDetailState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isSavedAddress: boolean;
    isSavingAddress: boolean;
    isSavedCompany: boolean;
    isSavingCompany: boolean;
    company?: Company;
}