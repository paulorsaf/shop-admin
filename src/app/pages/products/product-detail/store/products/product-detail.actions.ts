import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/model/product/product";

export const loadDetail = createAction('[Product] load detail', props<{id: string}>());
export const loadDetailSuccess = createAction('[Product] load detail success', props<{product: Product}>());
export const loadDetailFail = createAction('[Product] load detail fail', props<{error: any}>());