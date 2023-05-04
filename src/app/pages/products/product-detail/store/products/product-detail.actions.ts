import { createAction, props } from "@ngrx/store";
import { Product, ProductImage } from "src/app/model/product/product";
import { AddStock, Stock, UpdateStockOption } from "src/app/model/product/stock";

export const clear = createAction('[Product] clear');

export const loadDetail = createAction('[Product] load detail', props<{id: string}>());
export const loadDetailSuccess = createAction('[Product] load detail success', props<{product: Product}>());
export const loadDetailFail = createAction('[Product] load detail fail', props<{error: any}>());

export const saveDetail = createAction('[Product] save detail', props<{product: Product}>());
export const saveDetailSuccess = createAction('[Product] save detail success');
export const saveDetailFail = createAction('[Product] save detail fail', props<{error: any}>());

export const loadStock = createAction('[Product] load stock', props<{id: string}>());
export const loadStockSuccess = createAction('[Product] load stock success', props<{stock: Stock[]}>());
export const loadStockFail = createAction('[Product] load stock fail', props<{error: any}>());

export const saveStockOption = createAction('[Product] save stock', props<{stock: AddStock}>());
export const saveStockOptionSuccess = createAction('[Product] save stock success');
export const saveStockOptionFail = createAction('[Product] save stock fail', props<{error: any}>());

export const uploadImage = createAction('[Product] upload image', props<{image: File}>());
export const uploadImageSuccess = createAction('[Product] upload image success');
export const uploadImageFail = createAction('[Product] upload image fail', props<{error: any}>());

export const removeImage = createAction('[Product] remove image', props<{image: ProductImage}>());
export const removeImageSuccess = createAction('[Product] remove image success');
export const removeImageFail = createAction('[Product] remove image fail', props<{error: any}>());

export const removeStock = createAction('[Product] remove stock', props<{stock: Stock}>());
export const removeStockSuccess = createAction('[Product] remove stock success');
export const removeStockFail = createAction('[Product] remove stock fail', props<{error: any}>());

export const updateStockOption = createAction('[Product] update stock', props<{stockOption: UpdateStockOption}>());
export const updateStockOptionSuccess = createAction('[Product] update stock success');
export const updateStockOptionFail = createAction('[Product] update stock fail', props<{error: any}>());

export const changeVisibility = createAction('[Product] change visibility', props<{id: string}>());
export const changeVisibilitySuccess = createAction('[Product] change visibility success', props<{id: string}>());
export const changeVisibilityFail = createAction('[Product] change visibility fail', props<{error: any}>());

export const resetFlags = createAction('[Product] reset flags');