import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/model/product/product";

export const load = createAction('[Product] load');
export const loadSuccess = createAction('[Product] load success', props<{products: Product[]}>());
export const loadFail = createAction('[Product] load fail', props<{error: any}>());