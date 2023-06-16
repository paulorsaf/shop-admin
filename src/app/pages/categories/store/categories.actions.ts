import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/model/category/category";

export const loadCategories = createAction('[Category] load');
export const loadCategoriesSuccess = createAction('[Category] load success', props<{categories: Category[]}>());
export const loadCategoriesFail = createAction('[Category] load fail', props<{error: any}>());

export const removeCategory = createAction('[Category] remove', props<{category: Category}>());
export const removeCategorySuccess = createAction('[Category] remove success');
export const removeCategoryFail = createAction('[Category] remove fail', props<{error: any}>());

export const updateCategoriesVisibility = createAction('[Category] update visibility', props<{id: string}>());