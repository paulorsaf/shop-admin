import { Company } from "src/app/model/company/company";
import { User } from "src/app/model/user/user";

export type UserState = {
    company?: Company;
    error: any;
    isLoadedLoggedCompany: boolean;
    isLoadingLoggedCompany: boolean;
    isLoggedOut: boolean;
    isLoggingOut: boolean;
    isVerifiedUserLogged: boolean;
    isVerifyingUserLogged: boolean;
    user?: User;
}