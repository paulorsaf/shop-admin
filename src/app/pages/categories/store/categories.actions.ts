import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/model/category/category";

export const load = createAction('[Category] load');
export const loadSuccess = createAction('[Category] load success', props<{categories: Category[]}>());
export const loadFail = createAction('[Category] load fail', props<{error: any}>());

export const remove = createAction('[Category] remove', props<{category: Category}>());
export const removeSuccess = createAction('[Category] remove success');
export const removeFail = createAction('[Category] remove fail', props<{error: any}>());