import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/model/product/product";

export const clear = createAction('[Product] clear');

export const loadDetail = createAction('[Product] load detail', props<{id: string}>());
export const loadDetailSuccess = createAction('[Product] load detail success', props<{product: Product}>());
export const loadDetailFail = createAction('[Product] load detail fail', props<{error: any}>());

export const saveDetail = createAction('[Product] save detail', props<{product: Product}>());
export const saveDetailSuccess = createAction('[Product] save detail success');
export const saveDetailFail = createAction('[Product] save detail fail', props<{error: any}>());

export const loadStock = createAction('[Product] load stock', props<{id: string}>());
export const loadStockSuccess = createAction('[Product] load stock success', props<{stock: any[]}>());
export const loadStockFail = createAction('[Product] load stock fail', props<{error: any}>());