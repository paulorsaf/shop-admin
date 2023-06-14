import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/model/product/product";

export const loadProducts = createAction('[Product] load', (filter: ProductsFilter = {}) => ({filter}));
export const loadMoreProducts = createAction('[Product] load more');
export const loadProductsSuccess = createAction('[Product] load success', props<{products: Product[]}>());
export const loadProductsFail = createAction('[Product] load fail', props<{error: any}>());

export const removeProduct = createAction('[Product] remove', props<{product: Product}>());
export const removeProductSuccess = createAction('[Product] remove success');
export const removeProductFail = createAction('[Product] remove fail', props<{error: any}>());

export const updateProductOnList = createAction('[Product] update product', props<{id: string}>());
export const updateProductOnListSuccess = createAction('[Product] update product success', props<{product: Product}>());
export const updateProductOnListFail = createAction('[Product] update product fail', props<{error: any}>());

type ProductsFilter = {
    internalId?: string;
}