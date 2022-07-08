import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/user";

export const verfiyUserIsLogged = createAction('[User] verify user is logged');
export const verfiyUserIsLoggedSuccess = createAction('[User] verify user is logged success', props<{user: User}>());
export const verfiyUserIsLoggedFail = createAction('[User] verify user is logged fail');