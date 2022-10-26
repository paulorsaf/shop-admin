import { createAction, props } from "@ngrx/store";
import { Company } from "src/app/model/company/company";
import { User } from "src/app/model/user/user";

export const verfiyUserIsLogged = createAction('[User] verify user is logged');
export const verfiyUserIsLoggedSuccess = createAction('[User] verify user is logged success', props<{user: User}>());
export const verfiyUserIsLoggedFail = createAction('[User] verify user is logged fail');

export const loadUserCompany = createAction('[User] load company');
export const loadUserCompanySuccess = createAction('[User] load company success', props<{company: Company}>());
export const loadUserCompanyFail = createAction('[User] load company fail', props<{error: any}>());

export const logout = createAction('[User] logout');
export const logoutSuccess = createAction('[User] logout success');