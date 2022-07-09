import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/model/category/category";

export const loadDetail = createAction('[Category] load detail', props<{id: string}>());
export const loadDetailSuccess = createAction('[Category] load detail success', props<{category: Category}>());
export const loadDetailFail = createAction('[Category] load detail fail', props<{error: any}>());